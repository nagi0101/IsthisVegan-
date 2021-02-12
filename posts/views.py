from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Post, RatedPost, Comment
import json
from .forms import PostForm, RatedPostForm
from django.db.models import Q

# Create your views here.
def post_list(request):
    if request.method == "GET":
        category = request.GET["category"]

        # 카테고리에 따라서 Post 또는 RatedPost에서 글을 최초로 50개 불러온다.
        if category == "INFO" or category == "COMMUNICATE":
            posts = Post.objects.filter(category=category).order_by("-created_at")
        else:
            posts = RatedPost.objects.filter(category=category).order_by("-created_at")

        posts_len = len(posts)
        max_page = posts_len // 50
        # max_page가 50으로 나누어 떨어지지 않을 경우
        if posts_len % 50 != 0:
            max_page += 1

        posts = posts[:50]

        ctx = {
            "posts": posts,
            "category": category,
            "max_page": max_page,
        }

        if category == "INFO" or category == "COMMUNICATE":
            return render(request, "posts/post_list.html", ctx)
        else:
            return render(request, "posts/rated_post_list.html", ctx)

    if request.method == "POST":
        data = json.loads(request.body)
        page = data["page"]
        category = data["category"]
        first_id = data["FIRST_POST_ID"]
        post_per_page = data["POST_PER_PAGE"]

        postList = []

        # 카테고리가 무엇이냐에 따라서 Post 또는 RatedPost에서
        # 추가적으로 불러올 글을 postList에 추가한다.
        if category == "INFO" or category == "COMMUNICATE":
            # 클라이언트가 첫 번째로 로드한 글을 찾는다.
            # 그 글부터 n 번째의 글을 계산하여 불러온다.
            first_post = get_object_or_404(Post, pk=first_id)
            # 한 카테고리 안의 글만 불러온 후, first_post보다
            # 일찍 쓰여진 글을 불러온다. 해당 글들을 created_at
            # 기준으로 역순으로 정렬한 후, page * post_per_page부터
            # (page + 1) * post_per_page 에 해당하는 글을 불러온다.
            posts = (
                Post.objects.filter(category=category)
                .filter(created_at__lte=first_post.created_at)
                .order_by("-created_at")[
                    post_per_page * page : post_per_page * (page + 1)
                ]
            )

            for post in posts:
                aPost = {
                    "id": post.id,
                    "nickname": post.user.nickname,
                    "title": post.title,
                    "liked_total": len(post.like.all()),
                    "date": post.return_written_time_or_date(),
                }
                postList.append(aPost)

        elif category == "VISIT" or category == "BUY":
            # 위의 if 블록의 주석 참고
            first_post = get_object_or_404(RatedPost, pk=first_id)
            posts = (
                RatedPost.objects.filter(category=category)
                .filter(created_at__lte=first_post.created_at)
                .order_by("-created_at")[
                    post_per_page * page : post_per_page * (page + 1)
                ]
            )

            for post in posts:
                aPost = {
                    "id": post.id,
                    "nickname": post.user.nickname,
                    "title": post.title,
                    "liked_total": len(post.like.all()),
                    "rate": post.rate,
                    "date": post.return_written_time_or_date(),
                }
                postList.append(aPost)

        # posts_list = list(posts.values())

        return JsonResponse(postList, safe=False)


@login_required
def post_detail(request, pk):
    if request.method == "GET":
        category = request.GET["category"]
        if category == "INFO" or category == "COMMUNICATE":
            post = get_object_or_404(Post, pk=pk)
        elif category == "VISIT" or category == "BUY":
            post = get_object_or_404(RatedPost, pk=pk)
        comments = post.comments.all()
        # 로그인 된 유저가 해당 글을 bookmark 했는가?
        bookmarked = request.user.bookmarks.filter(pk=pk).exists()
        ctx = {
            "post": post,
            "category": category,
            "comments": comments,
            "bookmarked": bookmarked,
        }
        if category == "INFO" or category == "COMMUNICATE":
            return render(request, "posts/post_detail.html", ctx)
        elif category == "VISIT" or category == "BUY":
            return render(request, "posts/rated_post_detail.html", ctx)


def on_bookmark_btn_clicked(request):
    data = json.loads(request.body)
    postPk = data["postPk"]
    post = get_object_or_404(Post, pk=postPk)
    # 로그인 된 유저가 해당 글을 bookmark 했는가?
    bookmarked = request.user.bookmarks.filter(pk=postPk).exists()
    if bookmarked:
        request.user.bookmarks.remove(post)
        bookmarked = False
    else:
        request.user.bookmarks.add(post)
        bookmarked = True
    return JsonResponse(bookmarked, safe=False)


def on_post_like_btn_clicked(request):
    data = json.loads(request.body)
    postPk = data["postPk"]
    post = get_object_or_404(Post, pk=postPk)
    liked = post.like.filter(pk=request.user.pk).exists()
    if liked:
        post.like.remove(request.user)
        liked = False
    else:
        post.like.add(request.user)
        liked = True
    likedTotal = len(post.like.all())
    ctx = {"liked": liked, "likedTotal": likedTotal}
    return JsonResponse(ctx)


def on_comment_like_btn_clicked(request):
    data = json.loads(request.body)
    commentPk = data["commentPk"]
    comment = get_object_or_404(Comment, pk=commentPk)
    liked = comment.like.filter(pk=request.user.pk).exists()
    if liked:
        comment.like.remove(request.user)
        liked = False
    else:
        comment.like.add(request.user)
        liked = True
    likedTotal = len(comment.like.all())
    ctx = {"liked": liked, "likedTotal": likedTotal}
    return JsonResponse(ctx)


def comment_create(request):
    data = json.loads(request.body)
    postPk = data["postPk"]
    content = data["content"]
    category = data["category"]

    if category == "INFO" or category == "COMMUNICATE":
        post = get_object_or_404(Post, pk=postPk)
    elif category == "VISIT" or category == "BUY":
        post = get_object_or_404(RatedPost, pk=postPk)

    newComment = Comment(
        post=post, object_id=postPk, content=content, user=request.user
    )
    newComment.save()

    comments = post.comments.all()
    # comments = list(comments.values())
    commentList = []
    for comment in comments:
        aComment = {
            "id": comment.id,
            "nickname": comment.user.nickname,
            "user_id": comment.user.id,
            "content": comment.content,
            "written_by_user": comment.user == request.user,
            "liked": comment.like.filter(pk=request.user.pk).exists(),
            "liked_total": len(comment.like.all()),
        }
        commentList.append(aComment)

    return JsonResponse(commentList, safe=False)


def comment_delete(request):
    data = json.loads(request.body)
    commentPk = data["commentPk"]

    comment = get_object_or_404(Comment, pk=commentPk)
    # 요청자가 댓글 작성자가 아닌 경우 False return
    if comment.user != request.user:
        return JsonResponse(False, safe=False)

    post = comment.post

    comment.delete()

    comments = post.comments.all()
    # comments = list(comments.values())
    commentList = []
    for comment in comments:
        aComment = {
            "id": comment.id,
            "nickname": comment.user.nickname,
            "user_id": comment.user.id,
            "content": comment.content,
            "written_by_user": comment.user == request.user,
            "liked": comment.like.filter(pk=request.user.pk).exists(),
            "liked_total": len(comment.like.all()),
        }
        commentList.append(aComment)

    return JsonResponse(commentList, safe=False)

@login_required
def post_create(request):
    category = request.GET["category"]

    if request.method == "GET":
        if category in ["INFO", "COMMUNICATE"]:
            form = PostForm()
        else:
            form = RatedPostForm()

        ctx = {
            "form": form,
            "category": category,
        }
        return render(request, "posts/post_create.html", ctx)
    else:
        if len(request.POST["content"]) == 0:
            return render(request, "posts/post_create.html", {"alert_flag": True})

        pk = 0
        if category in ["INFO", "COMMUNICATE"]:
            form = PostForm(request.POST)

            if form.is_valid():
                post = form.save(commit=False)
                post.user = request.user
                post.category = category
                post.save()
                pk = post.id
        else:
            form = RatedPostForm(request.POST)

            if form.is_valid():
                ratedpost = form.save(commit=False)
                ratedpost.user = request.user
                ratedpost.category = category
                ratedpost.save()
                pk = ratedpost.id

        return redirect(f"/detail/{pk}?category={category}")


def post_update(request, pk):
    category = request.GET["category"]

    if request.method == "GET":
        if category in ["INFO", "COMMUNICATE"]:
            post = get_object_or_404(Post, id=pk)
            form = PostForm(instance=post)
        else:
            post = get_object_or_404(RatedPost, id=pk)
            form = RatedPostForm(instance=post)

        ctx = {
            "form": form,
            "category": category,
        }
        return render(request, "posts/post_create.html", ctx)
    else:
        if category in ["INFO", "COMMUNICATE"]:
            post = get_object_or_404(Post, id=pk)
            form = PostForm(request.POST, request.FILES, instance=post)
        else:
            post = get_object_or_404(RatedPost, id=pk)
            form = RatedPostForm(request.POST, request.FILES, instance=post)

        if form.is_valid():
            post.save()
        return redirect(f"/detail/{pk}?category={category}")


def post_delete(request, pk):
    category = request.GET["category"]

    if category in ["INFO", "COMMUNICATE"]:
        post = get_object_or_404(Post, id=pk)
    else:
        post = get_object_or_404(RatedPost, id=pk)

    post.delete()
    return redirect(f"/posts/?category={category}")


def main(request):
    NEW_POST_DATE_RANGE = 700

    posts = Post.objects.all()
    # category들의 리스트
    category_list = []
    for category in Post.CATEGORY_SELECT:
        # DB에 저장되는 이름의 형태("BUY" 등)로 category의 리스트를 저장한다.
        category_list.append(category[0])

    ctx = {}
    # 카테고리별로 최근 NEW_POST_DATE_RANGE일 내에 작성된 글들을
    # 좋아요 순으로 정렬 후 좋아요가 가장 많은 5개를 ctx에 저장한다.
    for category in category_list:
        query_set = posts.filter(category=category).filter(
            created_at__gte=timezone.now()
            - timezone.timedelta(days=NEW_POST_DATE_RANGE)
        )
        unordered_list = list(query_set)
        ordered_list = sorted(unordered_list, key=lambda k: k.get_like_count())[::-1][
            :5
        ]
        ctx[category] = ordered_list
    ctx["category_list"] = category_list
    ctx["pk"] = request.user.id

    # buy = Post.objects.filter(category="BUY").order_by("-get_like_count", "title")[:5]
    #  # print(buy)
    # communicate = Post.objects.filter(category="COMMUNICATE").order_by(
    #     "-get_like_count", "title"
    # )[:5]
    # info = Post.objects.filter(category="INFO").order_by("-get_like_count", "title")[:5]
    # visit = Post.objects.filter(category="VISIT").order_by("-get_like_count", "title")[
    #     :5
    # ]

    # 유진아 마이페이지 잘 연결되는지 확인하려고 내가 pk 추가했어!! 놀라지말길
    # pk = request.user.id

    # ctx = {
    #     "posts": posts,
    #     "pk": pk,
    # }

    return render(request, "posts/main.html", ctx)


def search(request):

    posts = Post.objects.all()
    q = request.POST.get("kw", "")

    if q:
        posts = posts.filter(title__icontains=q)
        return render(request, "posts/post_search.html", {"posts": posts})
    else:
        return render(request, "posts/post_search.html")

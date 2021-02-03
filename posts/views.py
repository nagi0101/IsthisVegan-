from django.shortcuts import render, get_object_or_404
from .models import Post, RatedPost, Comment

# Create your views here.
def post_list(request):
    if request.method == "GET":
        category = request.GET["category"]

        if category == "INFO" or category == "COMMUNICATE":
            posts = Post.objects.filter(category=category)
        else:
            posts = RatedPost.objects.filter(category=category)

        ctx = {
            "posts": posts,
            "category": category,
        }

        if category == "INFO" or category == "COMMUNICATE":
            return render(request, "posts/post_list.html", ctx)
        else:
            return render(request, "posts/rated_post_list.html", ctx)


def post_detail(request, pk):
    if request.method == "GET":
        category = request.GET["category"]

        if category == "INFO" or category == "COMMUNICATE":
            post = get_object_or_404(Post, pk=pk)
        else:
            post = get_object_or_404(RatedPost, pk=pk)

        comments = post.comments.all()

        ctx = {
            "post": post,
            "category": category,
            "comments": comments,
        }

        if category == "INFO" or category == "COMMUNICATE":
            return render(request, "posts/post_detail.html", ctx)
        else:
            return render(request, "posts/rated_post_detail.html", ctx)


def post_create(request):
    pass
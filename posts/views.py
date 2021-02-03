from django.shortcuts import render, redirect
from .models import Post, RatedPost, Image
from .forms import PostForm, RatedPostForm

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


def post_detail(request):
    pass

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
        return render(request, 'posts/post_create.html', ctx)
    else:
        if category in ["INFO", "COMMUNICATE"]:
            form = PostForm(request.POST)
            if form.is_valid():
                post = form.save(commit=False)
                post.user = request.user
                post.category = category
                post.save()
                
                for img in request.FILES.getlist('imgs'):
                    image = Image()
                    image.post = post
                    image.image = img
                    image.save()
        else:
            form = RatedPostForm(request.POST)
            if form.is_valid():
                ratedpost = form.save(commit=False)
                ratedpost.user = request.user
                ratedpost.category = category
                ratedpost.save()

                for img in request.FILES.getlist('imgs'):
                    image = Image()
                    image.post = ratedpost
                    image.image = img
                    image.save()
            
        return redirect('http://127.0.0.1:8000/posts/?category='+category)

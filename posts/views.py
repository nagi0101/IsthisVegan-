from django.shortcuts import render
from .models import Post, RatedPost

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
    pass
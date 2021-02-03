from django.shortcuts import render
from .models import Post

# Create your views here.
def post_list(request):
    if request.method == "GET":
        category = request.GET["category"]
        print(category)
        posts = Post.objects.filter(category=category)
        print(posts)
        ctx = {
            "posts": posts,
            "category": category,
        }
        return render(request, "posts/post_list.html", ctx)


def post_detail(request):
    pass


def post_create(request):
    pass
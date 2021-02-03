from django.urls import path
from . import views

app_name = "posts"

urlpatterns = [
    path("posts/", views.post_list, name="post_list"),
    path("detail/<int:pk>", views.post_detail, name="post_detail"),
    path("create/", views.post_create, name="post_create"),
]

from django.urls import path
from . import views

app_name = "posts"

urlpatterns = [
    path("posts/", views.post_list, name="post_list"),
    path("detail/<int:pk>", views.post_detail, name="post_detail"),
    path("create/", views.post_create, name="post_create"),
    path("update/<int:pk>", views.post_update, name="post_update"),
    path("delete/<int:pk>", views.post_delete, name="post_delete"),
    path(
        "bookmark/",
        views.on_bookmark_btn_clicked,
        name="on_bookmark_btn_clicked",
    ),
    path(
        "postlike/",
        views.on_post_like_btn_clicked,
        name="on_post_like_btn_clicked",
    ),
    path(
        "commentlike/",
        views.on_comment_like_btn_clicked,
        name="on_comment_like_btn_clicked",
    ),
    path("main/", views.main, name="post_main" ),
    


]

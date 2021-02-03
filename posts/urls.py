from django.urls import path
from . import views

app_name = "posts"

urlpatterns = [
    path("communicate/", views.post_communicate, name="post_communicate"),
    path("visit/", views.post_visit, name="post_visit"),
    path("buy/", views.post_buy, name="post_buy"),
    path("info/", views.post_info, name="post_info"),
]

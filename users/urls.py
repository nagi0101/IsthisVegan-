from . import views
from django.urls import path, include
from .views import login, kakao_login
from django.contrib.auth import views as auth_views

app_name = "users"

urlpatterns = [
    path('', login, name='login'),
    path("mypage/<int:pk>/",views.user_page, name="user_page"),
    path("mypage/<int:pk>/bookmark/",views.user_bookmark, name="user_bookmark"),
    path("mypage/<int:pk>/mylist/",views.user_mylist, name="user_mylist"),
    path("mypage/<int:pk>/edit/",views.user_edit, name="user_edit"),
    path("mypage/<int:pk>/delete/",views.user_delete, name="user_delete"),
    path("mypage/<int:pk>/password/",views.user_password, name="user_password")

]

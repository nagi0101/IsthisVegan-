from . import views
from django.urls import path, include
from .views import login

app_name = "users"

urlpatterns = [
    path('', login, name='login'),
    path("mypage/<int:pk>/",views.user_page, name="user_page"),
    path("mypage/<int:pk>/bookmark/",views.user_bookmark, name="user_bookmark"),
    path("mypage/<int:pk>/mylist/",views.user_mylist, name="user_mylist"),

]

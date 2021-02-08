from django.urls import path
from . import views

app_name = "search"


urlpatterns = [
    path("", views.search_main, name="search"),
    path("search_btn_clicked/", views.search_btn_clicked, name="search_btn_clicked"),
]

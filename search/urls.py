from django.urls import path
from . import views

app_name = "search"


urlpatterns = [
    path("", views.search_main, name="search"),
    path("search_btn_clicked/", views.search_btn_clicked, name="search_btn_clicked"),
    path(
        "search_detail_filter/", views.search_detail_filter, name="search_detail_filter"
    ),
    path("tipoff/", views.tip_off, name="tip_off"),
    path("tipoff/create/", views.tip_off_create, name="tip_off_create"),
]

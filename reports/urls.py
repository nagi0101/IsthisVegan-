from django.urls import path
from . import views

app_name = "reports"

urlpatterns = [
    path("", views.ask_post_create, name="ask_post_create"),
]
from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path("offline/", views.offline, name="offline"),
    path("about_us/", views.about_us, name="about_us"),
]

from django.urls import path, include
from . import views

app_name = "notifications"

urlpatterns = [
    path("create_FCM_token", views.create_FCM_token, name="create_FCM_token"),
]

from django.urls import path
from . import views

app_name = "reports"

urlpatterns = [
    path("", views.ask_product_create, name="ask_product_create"),
]
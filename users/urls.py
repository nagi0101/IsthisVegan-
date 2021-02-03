from django.urls import path, include
from .import views



app_name = "users"

urlpatterns = [
    path('', views.login, name='login'),
    path('accounts/', include('allauth.urls')),
    
]

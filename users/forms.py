from django.contrib.auth.forms import UserChangeForm
from .models import User, Badge
from django import forms

class CustomUserChangeForm(UserChangeForm):
  password=None
  nickname = forms.CharField(label="별명", required=False)

  class Meta:
    model = User()
    fields = ['nickname','username','last_name','first_name','email']


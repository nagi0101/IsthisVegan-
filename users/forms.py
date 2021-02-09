from django.contrib.auth.forms import UserChangeForm
from .models import User, Badge
from django import forms

class CustomUserChangeForm(UserChangeForm):
  password=None
  nickname = forms.CharField(label="별명", required=False)

  class Meta:
    model = User()
    fields = ['nickname','username','last_name','first_name','email']


class SignupForm(forms.Form):
    nickname = forms.CharField(max_length=30, label='닉네임')

    def signup(self, request, user):
        user.nickname = self.cleaned_data['nickname']
        user.save()

    class Meta:
        model = User
        # fields='__all__'
        fields = ['username', 'password', 'nickname','email']

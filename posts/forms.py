from django import forms
from .models import Post, RatedPost

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content',]

class RatedPostForm(forms.ModelForm):
    class Meta:
        model = RatedPost
        fields =  ['title', 'content', 'rate',]




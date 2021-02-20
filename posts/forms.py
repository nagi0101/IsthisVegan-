from django import forms
from .models import Post, RatedPost
from .widgets import starWidget


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content',]

class RatedPostForm(forms.ModelForm):
    class Meta:
        model = RatedPost
        fields =  ['title', 'content', 'rate',]
        widgets = {
            'rate': starWidget,
        }



from django import forms
from .models import AskPost

class AskPostForm(forms.ModelForm):
    class Meta:
        model = AskPost
        fields = ['title', 'company','content',]
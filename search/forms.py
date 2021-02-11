from django import forms
from .models import TipOffPost

class TipOffPostForm(forms.ModelForm):
    class Meta:
        model = TipOffPost
        fields = ['name', 'content',]
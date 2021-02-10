from django.contrib import admin
from .models import AskPost

@admin.register(AskPost)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "title",
        "company"
    ]

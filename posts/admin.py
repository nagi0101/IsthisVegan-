from django.contrib import admin
from .models import Post, RatedPost, Image, Comment

class PostImage(admin.TabularInline):
    model = Image

class PostComment(admin.TabularInline):
    model = Comment

@admin.register(Post)
@admin.register(RatedPost)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "title",
        "like",
        "category",
    ]

    inlines = [PostImage, PostComment]

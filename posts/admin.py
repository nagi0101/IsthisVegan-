from django.contrib import admin
from .models import Post, RatedPost, Comment


class PostComment(admin.TabularInline):
    model = Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "title",
        "get_like_count",
        "category",
    ]

    list_filter = [
        "category",
    ]

    filter_horizontal = [
        "like",
    ]


@admin.register(RatedPost)
class RatedPostAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "title",
        "get_like_count",
        "rate",
        "category",
    ]

    filter_horizontal = [
        "like",
    ]


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "post",
    ]

    filter_horizontal = [
        "like",
    ]


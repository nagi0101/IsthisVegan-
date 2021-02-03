from django.contrib import admin
from .models import Post, RatedPost, Image, Comment

# admin.site.register(Post)
# admin.site.register(RatedPost)
# admin.site.register(Image)
# admin.site.register(Comment)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "title",
        "like",
        "category",
    ]


@admin.register(RatedPost)
class RatedPostAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "title",
        "like",
        "rate",
        "category",
    ]


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = [
        "__str__",
        "user",
        "post",
    ]


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = [
        "post",
        "image_tag",
    ]
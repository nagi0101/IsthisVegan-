from django.contrib import admin
from .models import Post, RatedPost, Image, Comment

# admin.site.register(Post)
admin.site.register(RatedPost)
admin.site.register(Image)
admin.site.register(Comment)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "title",
        "like",
        "category",
    ]

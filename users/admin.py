from django.contrib import admin
from .models import User, Badge

# admin.site.register(User)
# admin.site.register(Badge)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "nickname", "email", "is_staff"]

    filter_horizontal = [
        "bookmarks",
        "badges",
    ]


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ["name", "grade"]

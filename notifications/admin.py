from django.contrib import admin
from .models import FCMToken, InAppNotification


@admin.register(FCMToken)
class FCMTokenAdmin(admin.ModelAdmin):
    list_display = [
        "value",
        "user",
    ]


@admin.register(InAppNotification)
class InAppNotificationAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "category",
        "title",
        "created_at",
        "is_read",
    ]
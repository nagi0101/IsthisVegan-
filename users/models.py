from django.db import models
from django.contrib.auth.models import AbstractUser
from core.models import AbstractTimestamp


class User(AbstractUser, AbstractTimestamp):
    nickname = models.CharField(max_length=20)
    bookmarks = models.ManyToManyField("posts.Post", blank=True, related_name="users")
    badges = models.ManyToManyField("users.Badge", related_name="users", blank=True)

    def __str__(self):
        return self.nickname

    def new_notifications_list(self):
        return self.in_app_notifications.filter(is_read=False).order_by("-created_at")


class Badge(AbstractTimestamp):
    grade = models.PositiveIntegerField(default=1)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - grade {self.grade}"
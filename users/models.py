from django.db import models
from django.contrib.auth.models import AbstractUser
from core.models import AbstractTimestamp


class User(AbstractUser, AbstractTimestamp):
    nickname = models.CharField(max_length=20)
    bookmarks = models.ManyToManyField("posts.Post", blank=True, related_name="users")
    badges = models.ManyToManyField("users.Badge", related_name="users", blank=True)
    exp = models.PositiveIntegerField(default=0)
    level = models.PositiveIntegerField(default=1)

    def exp_for_level_up(self):
        return 100 + self.level * 10

    def level_up(self):
        if self.exp >= self.exp_for_level_up():
            self.exp = self.exp - self.exp_for_level_up()
            self.level += 1

    def __str__(self):
        return self.nickname


class Badge(AbstractTimestamp):
    grade = models.PositiveIntegerField(default=1)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - grade {self.grade}"
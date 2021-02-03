from django.db import models
from django.contrib.auth.models import AbstractUser
from core.models import AbstractTimestamp

class User(AbstractUser, AbstractTimestamp):
    nickname = models.CharField(max_length=20)
    bookmark = models.ManyToManyField("posts.Post", blank=True, related_name="users")
    badge = models.ManyToManyField("users.Badge", related_name="users")

    def __str__(self): 
        return self.nickname

class Badge(AbstractTimestamp):
    grade = models.PositiveIntegerField(default=1)
    name = models.CharField(max_length=50)

    def __str__(self): 
        return self.name
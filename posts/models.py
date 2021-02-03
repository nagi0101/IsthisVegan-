from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from core.models import AbstractTimestamp
from core.utils import upload_to_uuid

# Create your models here.


class Post(AbstractTimestamp):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=120)
    content = models.TextField()
    like = models.PositiveIntegerField(default=0)

class RatedPost(Post):
    rate = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10),
        ],
    )

class Image(AbstractTimestamp):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=upload_to_uuid)


class Comment(AbstractTimestamp):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    like = models.PositiveIntegerField(default=0)

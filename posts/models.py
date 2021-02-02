from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from core.models import AbstractTimestamp
from core.utils import upload_to_uuid

# Create your models here.


class Post(AbstractTimestamp):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    content = models.TextField()
    rate = models.PositiveSmallIntegerField(
        default=5,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10),
        ],
    )
    like = models.PositiveIntegerField(default=0)


class Image(AbstractTimestamp):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_to_uuid)


class Comment(AbstractTimestamp):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    recommend = models.PositiveIntegerField(default=0)

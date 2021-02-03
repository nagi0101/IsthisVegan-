from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from core.models import AbstractTimestamp
from core.utils import upload_to_uuid
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.html import mark_safe

# Create your models here.


class Post(AbstractTimestamp):

    CATEGORY_INFO = ("INFO", "정보")
    CATEGORY_COMMUNICATE = ("COMMUNICATE", "소통해요")
    CATEGORY_VISIT = ("VISIT", "가봤어요")
    CATEGORY_BUY = ("BUY", "사봤어요")

    CATEGORY_SELECT = (
        CATEGORY_INFO,
        CATEGORY_COMMUNICATE,
        CATEGORY_VISIT,
        CATEGORY_BUY,
    )

    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="posts"
    )
    title = models.CharField(max_length=120)
    content = RichTextUploadingField()
    like = models.ManyToManyField("users.User", blank=True, related_name="likedPosts")
    category = models.CharField(choices=CATEGORY_SELECT, max_length=20)

    def __str__(self):
        return f"{self.user} : {self.title}"


class RatedPost(Post):
    rate = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10),
        ],
    )

class Comment(AbstractTimestamp):
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="comments"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    like = models.ManyToManyField(
        "users.User", blank=True, related_name="likedComments"
    )
    content = models.TextField()

    def __str__(self):
        return f"{self.user.nickname} - {self.post.title}"
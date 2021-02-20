from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
from core.models import AbstractTimestamp
from core.utils import upload_to_uuid
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.html import mark_safe
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

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
    title = models.CharField(max_length=120, verbose_name='제목')
    content = RichTextUploadingField(verbose_name='내용')
    like = models.ManyToManyField("users.User", blank=True, related_name="likedPosts")
    category = models.CharField(choices=CATEGORY_SELECT, max_length=20)
    comments = GenericRelation("Comment")

    def __str__(self):
        return f"{self.user} : {self.title}"

    def get_like_count(self):
        return len(self.like.all())

    def written_before_today(self):
        return self.created_at < timezone.now() - timezone.timedelta(days=1)

    def return_written_time_or_date(self):
        if self.written_before_today():
            return self.created_at.strftime("%Y-%m-%d")
        else:
            return self.created_at.strftime("%H:%M")


class RatedPost(Post):
    rate = models.FloatField(verbose_name='평점')
 
 
class Comment(AbstractTimestamp):
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="comments"
    )
    # post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    post = GenericForeignKey("content_type", "object_id")

    like = models.ManyToManyField(
        "users.User", blank=True, related_name="likedComments"
    )
    content = models.TextField()

    def __str__(self):
        return f"{self.user.nickname} - {self.post}"



from django.db import models
from core.models import AbstractTimestamp
from core.utils import upload_to_uuid
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.html import mark_safe
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

class AskPost(AbstractTimestamp):
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="askPosts"
    )
    title = models.CharField(max_length=120, verbose_name="상품명")
    company = models.CharField(max_length=120, verbose_name="제조사")
    content = RichTextUploadingField(verbose_name="문의 내용")

    def __str__(self):
        return f"{self.user} : {self.title}"

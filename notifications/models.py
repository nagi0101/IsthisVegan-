from django.db import models
from core.models import AbstractTimestamp

# Create your models here.


class FCMToken(AbstractTimestamp):
    value = models.CharField(max_length=163, blank=True)
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="FCMTokens"
    )

    def __str__(self):
        return self.value


class InAppNotification(AbstractTimestamp):

    CATEGORY_COMMENT = ("COMM", "댓글")

    CATEGORY_CHOICES = (CATEGORY_COMMENT,)

    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="in_app_notifications"
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    link = models.URLField()
    is_read = models.BooleanField(default=False)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=4)

    def __str__(self):
        return f"{self.user} / {self.category} / {self.created_at}"

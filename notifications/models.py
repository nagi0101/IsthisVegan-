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
from django.db import models
from core.models import AbstractTimestamp
from ckeditor_uploader.fields import RichTextUploadingField
from django.urls import reverse

# Create your models here.


class Ingredient(models.Model):
    CATEGORY_MEAT = ("MEAT", "육류")
    CATEGORY_FISH = ("FISH", "어류")
    CATEGORY_EGG = ("EGG", "난류")
    CATEGORY_MILK = ("MILK", "우유")
    CATEGORY_ETC = ("ETC", "기타")

    CATEGORY_SELECT = (
        CATEGORY_MEAT,
        CATEGORY_FISH,
        CATEGORY_EGG,
        CATEGORY_MILK,
        CATEGORY_ETC,
    )

    name = models.CharField(max_length=60)
    category = models.CharField(choices=CATEGORY_SELECT, max_length=4)

    class Meta:
        verbose_name = "Ingredient"
        verbose_name_plural = "Ingredients"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Ingredient_detail", kwargs={"pk": self.pk})

class TipOffPost(AbstractTimestamp):
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="TipOffPosts"
    )
    prdlstReportNo =models.PositiveIntegerField(verbose_name="상품번호", default=0)
    content = RichTextUploadingField(verbose_name="제보 내용")

    def __str__(self):
        return f"{self.user} : {self.prdlstReportNo}"

from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ["name", "category"]

    list_filter = ["category"]

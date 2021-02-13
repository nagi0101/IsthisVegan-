from django.contrib import admin
from . import models

@admin.register(models.Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ["name", "category"]

    list_filter = ["category"]

@admin.register(models.TipOffPost)
class PostAdmin(admin.ModelAdmin):
    list_display = ["prdlstReportNo",]

    list_filter = ["prdlstReportNo",]

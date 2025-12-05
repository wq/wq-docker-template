from django.contrib.gis import admin
from .models import Category, Observation


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(Observation)
class ObservationAdmin(admin.GISModelAdmin):
    list_display = ("date", "user", "category")
    list_filter = ("user", "category", "date")

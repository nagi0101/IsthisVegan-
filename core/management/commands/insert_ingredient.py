from django.core.management.base import BaseCommand 
from search.models import Ingredient 
import csv

class Command(BaseCommand):     
    help = 'Insert into ingredient'     

    def handle(self, *args, **kwargs):
        CSV = 'ingredient.csv'

        with open(CSV, "r", newline='', encoding='UTF8') as csvfile:
            try:
                data_reader = csv.DictReader(csvfile)
                for row in data_reader:
                    Ingredient.objects.create(
                        name = row['name'],
                        category = row['category']
                    )
                self.stdout.write(self.style.SUCCESS("Complete insert into Ingredient!"))
            except Exception as e:
                print("error 발생!!", e)

from django.core.management.base import BaseCommand 
from search.models import Ingredient 

class Command(BaseCommand):     
    help = 'delete from ingredient'     

    def handle(self, *args, **kwargs):
        try:
            ingredients = Ingredient.objects.all()
            ingredients.delete()
            self.stdout.write(self.style.SUCCESS("Complete delete from Ingredient!"))
        except Exception as e:
            print("error 발생!!", e)
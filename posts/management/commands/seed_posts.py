import random
from django_seed import Seed
from django.core.management.base import BaseCommand
from posts.models import Post, RatedPost, Comment, Image
from users.models import User


class Command(BaseCommand):

    help = "This command creates posts"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            default=1,
            type=int,
            help="How many posts do you want to create?",
        )

    def handle(self, *args, **options):
        users = list(User.objects.all())
        number = options.get("number")
        seeder = Seed.seeder()
        seeder.add_entity(
            Post,
            number,
            {
                "user": lambda x: random.choice(users),
                "category": lambda x: random.choice(["INFO", "COMMUNICATE"]),
            },
        )
        seeder.add_entity(
            RatedPost,
            number,
            {
                "user": lambda x: random.choice(users),
                "rate": lambda x: random.randint(1, 10),
                "category": lambda x: random.choice(["VISIT", "BUY"]),
            },
        )
        seeder.add_entity(
            Comment,
            number * 5,
            {
                "user": lambda x: random.choice(users),
            },
        )
        seeder.execute()
        self.stdout.write(
            self.style.SUCCESS(
                f"{number} of Post, RatedPost and {number*5} of Comment created! "
            )
        )

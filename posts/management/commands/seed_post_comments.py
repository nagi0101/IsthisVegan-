import random
from django_seed import Seed
from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from posts.models import Post, Comment
from users.models import User


def random_user():
    users = list(User.objects.all())
    randint = random.randint(0, len(users))
    liked_users = random.choices(users, k=randint)
    return liked_users


class Command(BaseCommand):

    help = "This command creates comments"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            default=1,
            type=int,
            help="How many comments do you want to create?",
        )

    def handle(self, *args, **options):
        users = list(User.objects.all())
        post_type = ContentType.objects.get_for_model(Post)

        number = options.get("number")
        seeder = Seed.seeder()
        seeder.add_entity(
            Comment,
            number,
            {
                "user": lambda x: random.choice(users),
                "content_type": post_type,
                "object_id": lambda x: random.choice(
                    list(post_type.model_class().objects.all())
                ).pk,
            },
        )
        seeder.execute()
        self.stdout.write(self.style.SUCCESS(f"{number} of Comment created!"))

import random
from django_seed import Seed
from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from posts.models import Post, RatedPost, Comment
from users.models import User


class Command(BaseCommand):

    help = "This command creates comments"

    def generate_comment_dummy_settings(self):
        users = list(User.objects.all())
        post_type = ContentType.objects.get_for_model(Post)
        rated_post_type = ContentType.objects.get_for_model(RatedPost)

        self.content_type = random.choice([post_type, rated_post_type])
        print(self.content_type.model_class().objects.all())
        post = random.choice(list(self.content_type.model_class().objects.all()))
        print(post)
        self.object_id = post.pk

        return {
            "user": lambda x: random.choice(users),
            "content_type": self.content_type,
            "object_id": self.object_id,
        }

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            default=1,
            type=int,
            help="How many comments do you want to create?",
        )

    def handle(self, *args, **options):
        users = list(User.objects.all())
        post_type = ContentType.objects.get_for_model(RatedPost)

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

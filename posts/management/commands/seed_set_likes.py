import random
from django.core.management.base import BaseCommand
from posts.models import Post, RatedPost, Comment
from users.models import User


class Command(BaseCommand):

    help = "This command sets likes of posts, comments"

    def handle(self, *args, **options):
        users = User.objects.all()
        numUsers = len(users)
        posts = Post.objects.all()
        ratedPosts = RatedPost.objects.all()
        comments = Comment.objects.all()

        for post in posts:
            randUser = random.choices(users, k=numUsers)
            post.like.set(randUser)
        for comment in comments:
            randUser = random.choices(users, k=numUsers)
            comment.like.set(randUser)

        self.stdout.write(self.style.SUCCESS("Now people love each other!"))
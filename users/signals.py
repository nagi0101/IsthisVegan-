from django.db.models.signals import post_save
from django.dispatch import receiver
from posts.models import Post, RatedPost, Comment


EXP_POST = 50
EXP_COMMENT = 10


@receiver(post_save, sender=Post)
def Post_post_save(sender, **kwargs):
    if kwargs["created"]:
        user = kwargs["instance"].user
        user.exp += EXP_POST
        user.level_up()
        user.save()


@receiver(post_save, sender=RatedPost)
def RatedPost_post_save(sender, **kwargs):
    if kwargs["created"]:
        user = kwargs["instance"].user
        user.exp += EXP_POST
        user.level_up()
        user.save()


@receiver(post_save, sender=Comment)
def Comment_post_save(sender, **kwargs):
    if kwargs["created"]:
        user = kwargs["instance"].user
        user.exp += EXP_COMMENT
        user.level_up()
        user.save()

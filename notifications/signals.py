from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import InAppNotification
from posts.models import Post, RatedPost, Comment
from firebase_admin import messaging


@receiver(post_save, sender=Comment)
def Comment_post_save(sender, **kwargs):
    print("comment created!")
    comment = kwargs["instance"]
    post = comment.post
    print(post.get_absolute_url())
    print(comment.user, post.user)
    if comment.user != post.user:
        TITLE = f"{comment.user}님이 당신의 글에 댓글을 남겼습니다!"
        CONTENT = comment.content
        LINK = f"https://isthisvegan.ga/{post.get_absolute_url()}"

        new_in_app_notification = InAppNotification(
            user=post.user,
            title=TITLE,
            content=CONTENT,
            link=LINK,
            category="COMM",
        )
        new_in_app_notification.save()
        registration_tokens = post.user.FCMTokens

        # See documentation on defining a message payload.
        for token in registration_tokens.all():
            try:
                message = messaging.Message(
                    webpush=messaging.WebpushConfig(
                        notification=messaging.WebpushNotification(
                            title=TITLE,
                            body=CONTENT,
                            icon="/static/img/icon6x.png",
                        ),
                        fcm_options=messaging.WebpushFCMOptions(link=LINK),
                    ),
                    token=token.value,
                )
                response = messaging.send(message)
                # Response is a message ID string.
                print("Successfully sent message:", response)
            except:
                continue
from django.db.models.signals import post_save
from django.dispatch import receiver
from posts.models import Post, RatedPost, Comment
from firebase_admin import messaging


@receiver(post_save, sender=Comment)
def Comment_post_save(sender, **kwargs):
    print("comment created!")
    comment = kwargs["instance"]
    post = comment.post
    print(post.get_absolute_url().url)
    print(comment.user, post.user)
    if comment.user != post.user:
        registration_tokens = post.user.FCMTokens
        print(registration_tokens.all())

        # See documentation on defining a message payload.
        for token in registration_tokens.all():
            try:
                message = messaging.Message(
                    data={
                        "title": f"{comment.user}님이 당신의 글에 댓글을 남겼습니다!",
                        "body": comment.content,
                        "link": f"http://127.0.0.1:8000/{post.get_absolute_url().url}",
                    },
                    token=token.value,
                )

                response = messaging.send(message)
                # Response is a message ID string.
                print("Successfully sent message:", response)
            except:
                continue

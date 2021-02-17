from firebase_admin import messaging


def send_to_firebase_cloud_messaging():
    # This registration token comes from the client FCM SDKs.
    registration_token = "c4tBJXmTWY3IWKK3OKfZ7y:APA91bEE2-EEo4x1gvTw2xnMFcD87dEIYe5K5GOjkqdm8ddHE1OTGBU2203v_U_PX3UkbTurGv-JB0rBgG_JnB8f_MNLJaVLS2X1rexUXuA2lbSgG2lkGDvAZCsndXohpVGFZz32vUO1"

    # See documentation on defining a message payload.
    message = messaging.Message(
        data={
            "score": "850",
            "time": "2:45",
        },
        token=registration_token,
    )

    response = messaging.send(message)
    # Response is a message ID string.
    print("Successfully sent message:", response)

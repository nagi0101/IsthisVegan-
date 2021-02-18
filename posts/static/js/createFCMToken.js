const CREATE_FCM_TOKEN_URL = "/notifications/create_FCM_token";

messaging
  .getToken({
    vapidKey:
      "BGrP1OXQDNpi1nsjv58z2POlDXenRKaHwASczZl4BltLtqvw2wNAU-kJup4hw7D9ryqM7nzIgw3uojDJLeH6OLc",
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      axios.post(CREATE_FCM_TOKEN_URL, {
        FCMToken: currentToken,
      });
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

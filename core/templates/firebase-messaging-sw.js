// import firebase from "firebase/app";
// import "firebase/messaging";

{% comment %} if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
} {% endcomment %}

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "AAAAl_4TlCQ:APA91bF231-PVdWPHm_I70Ry2JVI0ZtdqD51uimi7qwr6UF5GSrU2cjigr_Oj4-4NMxpr618LYMu07TAGIg6ncowtwbozn6uif5jjPK--xmxXnvSY5wte6PzyR0PyJ1o8zxKbBziJUVP"
);

Notification.requestPermission().then(function (permission) {
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.log("Unable to get permission to notify.");
  }
});

if ("undefined" === typeof window) {
  importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js"
  );
}


firebase.initializeApp({
  apiKey: "AIzaSyC39lD1jN0UR5I9THqBlL0GBW0dHATUbDA",
  authDomain: "isthisvegan-501b8.firebaseapp.com",
  projectId: "isthisvegan-501b8",
  storageBucket: "isthisvegan-501b8.appspot.com",
  messagingSenderId: "418354642337",
  appId: "1:418354642337:web:78793b8ffeb0c636f4dfe0",
  measurementId: "G-Y8VBTH6PWW"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 설정
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  // const notificationTitle = payload.data.title;
  // const notificationOptions = {
  //   body: payload.data.body,
  //   icon: '/static/img/icon6x.png',
  // };

  {% comment %} self.registration.showNotification(); {% endcomment %}
});


{% comment %} const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "AAAAYWfhPaE:APA91bE0RBDYdgnTIEMT7HsjA8WBf3AzRCSKTcJyLDWxxg2mcW6FDr34g5LXR-dX0E_SRV_xw48CdS4xtbgYG5XmnzILZxOdV-Fgv66KbYgRdECSxPVWBwbfbaqzdITl8LQw7KDorS34"
); {% endcomment %}

{% comment %} Notification.requestPermission().then(function (permission) {
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.log("Unable to get permission to notify.");
  }
}); {% endcomment %}

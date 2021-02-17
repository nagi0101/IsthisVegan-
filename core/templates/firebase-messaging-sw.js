
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDARGGBG3LCA4d-9wfCQ7sGaP6jyjUmYZc",
    authDomain: "isthisvegan-84941.firebaseapp.com",
    databaseURL: "https://isthisvegan-84941.firebaseio.com",
    projectId: "isthisvegan-84941",
    storageBucket: "isthisvegan-84941.appspot.com",
    messagingSenderId: "652802757668"
};

// firebase.initializeApp(config);
 
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BCtNblT5fftiekEEzzxk_DcldECinhMogzLyCEYjFwLpzJcFEavQmsjkIbgbfdLIoYE-rBgnL3BDwJSTNRavov0");

Notification.requestPermission().then(function(permission) {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
  } else {
    console.log('Unable to get permission to notify.');
  }
});


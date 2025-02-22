importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCaJT2Lai2YC6nKRAwFjnOqViIZMzoh8M4",
  authDomain: "elohim-mart.firebaseapp.com",
  databaseURL: "https://elohim-mart-default-rtdb.firebaseio.com",
  projectId: "elohim-mart",
  storageBucket: "elohim-mart.firebasestorage.app",
  messagingSenderId: "746258864497",
  appId: "1:746258864497:web:a27ebdb1c716cc9cb23ed0",
  measurementId: "G-JV59ZEQ6RD",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
// );

// // import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyC6b8wja3FNl7AGAo1iDZeJKfkbKS0J_Is",
//   authDomain: "bookifyapp-17486.firebaseapp.com",
//   projectId: "bookifyapp-17486",
//   storageBucket: "bookifyapp-17486.appspot.com",
//   messagingSenderId: "580374179432",
//   appId: "1:580374179432:web:c3889a9d803cb452b315dd",
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message",
//     payload
//   );

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

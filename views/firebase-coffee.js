import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

function runFirebase() {
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoUqGAfBBuuqqpIjyfLQT8MfB4PXD9Nh8",
  authDomain: "iterablecoffee.firebaseapp.com",
  projectId: "iterablecoffee",
  storageBucket: "iterablecoffee.appspot.com",
  messagingSenderId: "675775245867",
  appId: "1:675775245867:web:5be24a5b4569f694bb846e",
  measurementId: "G-CDYFMMM4BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
messaging.getToken({vapidKey: "BFDo_pQlZx6E4rm81Cb0l399lEM63gS0nSgeIECKyBUUnh9kQQEXgTm8XfXqZuia51Plc1dz1aRRxjZCIPFV0mc"});
debugger
function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
}

        requestPermission()       
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
}
  $(function () {
    console.log('Firebase!');
    runFirebase();
    
  });
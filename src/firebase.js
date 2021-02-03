// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA-emjl5XuUhCJHxth9BRSKxc38EJNywns",
    authDomain: "shopez-a4da7.firebaseapp.com",
    projectId: "shopez-a4da7",
    storageBucket: "shopez-a4da7.appspot.com",
    messagingSenderId: "433142050434",
    appId: "1:433142050434:web:dd3e3bd73255238d340e9b",
    measurementId: "G-JG411313ZE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth  = firebase.auth();

  export { db , auth };

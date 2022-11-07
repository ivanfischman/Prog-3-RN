import app from "firebase/app";
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDiAdnYZdtpDBI18tAwiuhO7mIYxtNbbaU",
  authDomain: "udesa-gram-proyect.firebaseapp.com",
  projectId: "udesa-gram-proyect",
  storageBucket: "udesa-gram-proyect.appspot.com",
  messagingSenderId: "531622669385",
  appId: "1:531622669385:web:7369d5ac2ba5669fa1a398"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

// authentication

export const auth = firebase.auth()

// database

export const db = app.firestore()

// storage

export const storage = app.storage()
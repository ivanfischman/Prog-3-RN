import app from "firebase/app";
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAJXQUqjsejpiGmKBvF8m6C8i4qpfpzsCA",
  authDomain: "jm-gram.firebaseapp.com",
  projectId: "jm-gram",
  storageBucket: "jm-gram.appspot.com",
  messagingSenderId: "549660828486",
  appId: "1:549660828486:web:f1f0a22abaaa714c713b47"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

// authentication

export const auth = firebase.auth()

// database

export const db = app.firestore()

// storage

export const storage = app.storage()
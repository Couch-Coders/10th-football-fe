// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// import getAnalytics from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8XhZXYq4ZOy5I_5EXn7-l-nzyCagS9Lc",
  authDomain: "football-3b39f.firebaseapp.com",
  projectId: "football-3b39f",
  storageBucket: "football-3b39f.appspot.com",
  messagingSenderId: "796123794315",
  appId: "1:796123794315:web:2fdde8b20070a730df3d8e",
  measurementId: "G-3CNYD22ZFL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
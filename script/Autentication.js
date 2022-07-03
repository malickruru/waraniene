// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
// import{GoogleAuthProvider, getAuth,signInWithRedirect,getRedirectResult }from"https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyC0wbzTH9KGs38Yn5S5sJYMOSTndaVIcCA",
  authDomain: "waraniene-fa029.firebaseapp.com",
  projectId: "waraniene-fa029",
  storageBucket: "waraniene-fa029.appspot.com",
  messagingSenderId: "247414136546",
  appId: "1:247414136546:web:39cd36eb378ff646dc08bb",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const auth= getAuth(app);
const auth = app.auth();
//google
const provider = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();
const TwitterProvider = new firebase.auth.TwitterAuthProvider();
 



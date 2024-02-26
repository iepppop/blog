// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUdzeVgS3pLh1rv9uGneyMNdbj437XPqQ",
  authDomain: "blog-1a5a0.firebaseapp.com",
  projectId: "blog-1a5a0",
  storageBucket: "blog-1a5a0.appspot.com",
  messagingSenderId: "421714522832",
  appId: "1:421714522832:web:69eadacda47b7aa2aea4d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASmQzH5kVLcbcwstyELqv76GFtCEFtsXw",
  authDomain: "todoapp-a827c.firebaseapp.com",
  projectId: "todoapp-a827c",
  storageBucket: "todoapp-a827c.appspot.com",
  messagingSenderId: "33191775215",
  appId: "1:33191775215:web:4dae2773d41173b56e441a",
  measurementId: "G-KJ4H4V6T6Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
//const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtsSsFiPXX5GDeExvDMPLB0pGFxAv2Zo0",
  authDomain: "fir-course-92683.firebaseapp.com",
  projectId: "fir-course-92683",
  storageBucket: "fir-course-92683.firebasestorage.app",
  messagingSenderId: "113529661269",
  appId: "1:113529661269:web:1c7472c2ea5624c682f1dc",
  measurementId: "G-F7N5VWMHEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
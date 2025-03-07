// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC54qTcRatdHlH9o_2OGur2TMJ73TveG2A",
  authDomain: "tripguide-d88cd.firebaseapp.com",
  projectId: "tripguide-d88cd",
  storageBucket: "tripguide-d88cd.firebasestorage.app",
  messagingSenderId: "193770113883",
  appId: "1:193770113883:web:3864b0aa6ad0cd922aa87e",
  clientId:import.meta.env.VITE_GOOGLE_CLIENT_ID,
  measurementId: "G-SR7PYN7NLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
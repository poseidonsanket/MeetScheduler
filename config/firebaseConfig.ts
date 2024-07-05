// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "test-88ce2.firebaseapp.com",
  projectId: "test-88ce2",
  storageBucket: "test-88ce2.appspot.com",
  messagingSenderId: "99382303737",
  appId: "1:99382303737:web:86c70475405ab771d63b28",
  measurementId: "G-BP14DSML38",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

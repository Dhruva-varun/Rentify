// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rentify-158fe.firebaseapp.com",
  projectId: "rentify-158fe",
  storageBucket: "rentify-158fe.firebasestorage.app",
  messagingSenderId: "1021113713170",
  appId: "1:1021113713170:web:94543f1421e08ce5f38ecb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
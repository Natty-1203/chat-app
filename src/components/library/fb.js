// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBLizywMSn8_f6eSMmsRpoSizsTBmVlBI0",
  authDomain: "chat-app-12-1e16d.firebaseapp.com",
  projectId: "chat-app-12-1e16d",
  storageBucket: "chat-app-12-1e16d.firebasestorage.app",
  messagingSenderId: "670134449760",
  appId: "1:670134449760:web:a6d2dad7f2a57f2201b505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
export const auth = getAuth(app);

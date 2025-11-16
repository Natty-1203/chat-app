import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: ApiKey,
  authDomain: "chat-app-12-1e16d.firebaseapp.com",
  projectId: "chat-app-12-1e16d",
  storageBucket: "chat-app-12-1e16d.firebasestorage.app",
  messagingSenderId: "670134449760",
  appId: "1:670134449760:web:a6d2dad7f2a57f2201b505"
};

const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
export const auth = getAuth(app);

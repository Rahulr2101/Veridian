
import { initializeApp } from "firebase/app";
import {getAuth} from"firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDCK90cYjVtshoykiTjMysRN7Z1oAEfp78",
  authDomain: "veridian-c0db7.firebaseapp.com",
  projectId: "veridian-c0db7",
  storageBucket: "veridian-c0db7.firebasestorage.app",
  messagingSenderId: "523615810595",
  appId: "1:523615810595:web:6f8c4e0b4ae23f5ef4ad96"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH= getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
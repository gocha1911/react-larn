// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc89c-2fZBHdiFEGLYcf6qiLg1isZV21c",
  authDomain: "react-learn-69676.firebaseapp.com",
  projectId: "react-learn-69676",
  storageBucket: "react-learn-69676.appspot.com",
  messagingSenderId: "673656202855",
  appId: "1:673656202855:web:8f6e2a8e21339538ffd6c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
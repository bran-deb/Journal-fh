import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBhOiNolBtvAhxv255TJNAMT0uG838Swwo",
    authDomain: "react-app-fh-a723e.firebaseapp.com",
    projectId: "react-app-fh-a723e",
    storageBucket: "react-app-fh-a723e.appspot.com",
    messagingSenderId: "650352079676",
    appId: "1:650352079676:web:a7f8e00a27c59400bfe439"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider()
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    app,
    db,
    googleAuthProvider,

    doc,
    setDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
}
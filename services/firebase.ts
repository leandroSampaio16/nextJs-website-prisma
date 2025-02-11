// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBddEpCOKcadZyNMUO3AamrXL70aJ4LG9A",
    authDomain: "projetocatia-646f9.firebaseapp.com",
    projectId: "projetocatia-646f9",
    storageBucket: "projetocatia-646f9.appspot.com",
    messagingSenderId: "839058776819",
    appId: "1:839058776819:web:d8335f71f99e19de1fcd86",
    measurementId: "G-PX9T7QEL7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
/**
 * Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
 * firebase experiments:enable webframeworks
 * firebase deploy
 */
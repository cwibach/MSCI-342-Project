import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCy2L5tOD29uoh_A8VT-oMhX9AcOmdD04c",
    authDomain: "msci342renters.firebaseapp.com",
    projectId: "msci342renters",
    storageBucket: "msci342renters.appspot.com",
    messagingSenderId: "950839305801",
    appId: "1:950839305801:web:e7e12c50aca8d53a73c198",
    measurementId: "G-LXELBQ4D9W"
  };

const app = initializeApp(firebaseConfig, "Renters");

// gives us an auth instance
const authRenters = getAuth(app);

// in order to use this auth instance elsewhere
export default authRenters;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcQKfiRi5k6ewoKZ7-81am0pxbDTKicOI",
  authDomain: "msci-342-test.firebaseapp.com",
  projectId: "msci-342-test",
  storageBucket: "msci-342-test.appspot.com",
  messagingSenderId: "155034476519",
  appId: "1:155034476519:web:9f3e770c25daa828a32742",
  measurementId: "G-VHM3PN3NL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class Firebase {

}

export default Firebase;
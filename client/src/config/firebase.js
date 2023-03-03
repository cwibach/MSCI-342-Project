import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCcQKfiRi5k6ewoKZ7-81am0pxbDTKicOI",
    authDomain: "msci-342-test.firebaseapp.com",
    projectId: "msci-342-test",
    storageBucket: "msci-342-test.appspot.com",
    messagingSenderId: "155034476519",
    appId: "1:155034476519:web:9f3e770c25daa828a32742",
    measurementId: "G-VHM3PN3NL6"
};

const app = initializeApp(firebaseConfig);

// gives us an auth instance
const auth = getAuth(app);

// in order to use this auth instance elsewhere
export default auth;
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

// const firebaseConfig = {
//   apiKey: "AIzaSyAYAku5nmUzuWE0AxIPa4fCTsH_4WaBFZg",
//   authDomain: "msci342-project.firebaseapp.com",
//   projectId: "msci342-project",
//   storageBucket: "msci342-project.appspot.com",
//   messagingSenderId: "827418522198",
//   appId: "1:827418522198:web:891136f3cc7408300841f7",
//   measurementId: "G-2TSJML0RV6"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
// const todosCol = collection(db, 'todos');
// const snapshot = await getDocs(todosCol);

//Detect auth state

// onAuthStateChanged(auth, user => {
//   if (user != null) {
//     console.log('logged in!');
//   }else{
//     console.log('No user');
//   }
// });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

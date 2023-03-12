// AuthContext.js

import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import auth from "../config/firebase";
import authRenters from "../config/firebaseRenters";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function renterRegister(email, password) {
    return createUserWithEmailAndPassword(authRenters, email, password);
  }

  function renterLogin(email, password) {
    return signInWithEmailAndPassword(authRenters, email, password);
  }

  function renterLogout() {
    return signOut(authRenters);
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    renterRegister,
    renterLogin,
    renterLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
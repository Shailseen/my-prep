import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { useToast } from "./ToastContext";
import { useNavigate } from "react-router-dom";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_buVcpv0maTgwt7MDjHM6ux0BFIUUg24",
  authDomain: "neogqod.firebaseapp.com",
  projectId: "neogqod",
  storageBucket: "neogqod.appspot.com",
  messagingSenderId: "4959195096",
  appId: "1:4959195096:web:c99195a7b4412c4fceacad",
  measurementId: "G-KZKGG29D9E",
};
initializeApp(firebaseConfig);

const AuthContext = React.createContext();
const auth = getAuth();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { callToast } = useToast();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password, name) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(user);
        callToast("Signup Successfully!!");
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode === "auth/email-already-in-use")
          callToast("Email already taken!!");
        else callToast(errorCode);
      });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        callToast("Login Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        callToast(errorMessage);
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        callToast("Logout successfully!!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    logout,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

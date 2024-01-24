import React from "react";
import { createContext, useContext } from "react";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6b8wja3FNl7AGAo1iDZeJKfkbKS0J_Is",
  authDomain: "bookifyapp-17486.firebaseapp.com",
  projectId: "bookifyapp-17486",
  storageBucket: "bookifyapp-17486.appspot.com",
  messagingSenderId: "580374179432",
  appId: "1:580374179432:web:c3889a9d803cb452b315dd",
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(firebaseContext);
};

const name = "Utkarsh"

const FirebaseProvider = (props) => {
  return <firebaseContext.Provider value={name} >{props.children}</firebaseContext.Provider>;
};

export default FirebaseProvider ;

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

import { initializeApp } from "firebase/app";

// Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

// Notification
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC6b8wja3FNl7AGAo1iDZeJKfkbKS0J_Is",
  authDomain: "bookifyapp-17486.firebaseapp.com",
  projectId: "bookifyapp-17486",
  storageBucket: "bookifyapp-17486.appspot.com",
  messagingSenderId: "580374179432",
  appId: "1:580374179432:web:c3889a9d803cb452b315dd",
};

// Variables
const firebaseApp = initializeApp(firebaseConfig);
const firebaseContext = createContext(null);
const name = "Utkarsh";
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage();

export const messaging = getMessaging(firebaseApp) ;

export const useFirebase = () => {
  return useContext(firebaseContext);
};

const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // Functions

  const signupUserWithEmailIdAndPassword = async (name, email, password) => {
    console.log("Signing up user...");
    const result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await updateProfile(firebaseAuth.currentUser, {
      displayName: name,
    });
    console.log("Account created Successfully..!");
    return result;
  };

  const loginUserWithEmailIdAndPassword = async (name, email, password) => {
    console.log("Signing in use...");
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await updateProfile(firebaseAuth.currentUser, {
      displayName: name,
    });
    console.log("SignedIn Successfully");
    return result;
  };

  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const handleCreateNewListing = async (name, isbn, price, coverPic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    const docRef = await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      displayName: user.displayName,
      userEmail: user.email,
      userID: user.uid,
    });

    return docRef;
  };

  const getListAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getBooksById = async (bookid) => {
    const docRef = doc(firestore, "books", bookid);
    const result = await getDoc(docRef);
    return result;
  };

//   console.log(user);
  const placeOrder = async (bookId, quantity, name) => {
    const collectionRef = collection(firestore, "books", bookId, "order");
    const result = await addDoc(collectionRef, {
      bookName: name,
      displayName: user.displayName,
      userEmail: user.email,
      userID: user.uid,
      quantity: Number(quantity),
    });
    return result;
  };

  const fetchMyBooks = async(userId)=>{
    const collectionRef = collection(firestore, "books") ;
    const q = query(collectionRef, where("userID", "==", userId))

    const result = await getDocs(q) ;
    return result ;
  }

  const fetchMyOrders = async(bookId)=>{
    const collectionRef = collection(firestore, "books", bookId, "order") ;
    const result = await getDocs(collectionRef) ;
    return result ;
  }

  //   console.log(user);
  const isLoggedIn = user ? true : false;

  return (
    <firebaseContext.Provider
      value={{
        name,
        signupUserWithEmailIdAndPassword,
        loginUserWithEmailIdAndPassword,
        signinWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        getListAllBooks,
        getImageURL,
        getBooksById,
        placeOrder,
        fetchMyBooks,
        user,
        fetchMyOrders,

      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};

export default FirebaseProvider;

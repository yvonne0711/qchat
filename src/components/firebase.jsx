import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBF4vRuZIOoA-IF3gdfB2Rz0VYs1hHoJA0",
  authDomain: "qchat-b2051.firebaseapp.com",
  projectId: "qchat-b2051",
  storageBucket: "qchat-b2051.appspot.com",
  messagingSenderId: "257526461994",
  appId: "1:257526461994:web:fdb43dbc83ed0763b1b553",
  measurementId: "G-QKQZ9T7NRM"
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();


const googleProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,  
  collection,
  addDoc,
  getDocs,
  googleProvider
};


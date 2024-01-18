import React, { useState, useEffect } from "react";
import AOS from 'aos'; // Import AOS
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  db,
  collection,
  addDoc,
} from "./firebase";
import "aos/dist/aos.css";
import "./Registration.css";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Dodaj dane użytkownika do kolekcji Firestore
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        displayName: displayName,
      });

      console.log("User registered", userCredential.user);
    } catch (error) {
      console.error("register error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Dodaj dane użytkownika do kolekcji Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
      });

      console.log("Zalogowano przez Google:", user);
    } catch (error) {
      console.error("Błąd podczas logowania przez Google:", error.message);
    }
  };

  // Initialize AOS after the component is mounted
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (

    <div>
      
      <h1>Welcome to Qchat</h1>
    <div className="registration-container" data-aos="fade-up">
      <h2>Register with QChat</h2>
      <label>Qmail:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Set Your Quassword:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>Qickname:</label>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <button onClick={handleRegistration}>Register</button>


      <button onClick={handleGoogleSignIn}>Register by Google</button>
    </div>
    </div>
  );
};

export default Registration;

// Registration.jsx
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
  const [registrationMessage, setRegistrationMessage] = useState(""); // Add new state for registration message

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user data to Firestore collection
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        displayName: displayName,
      });

      console.log("User registered successfully:", userCredential.user);
      setRegistrationMessage("Registration successful. Logged in successfully.");
    } catch (error) {
      console.error("Registration error:", error.message);
      setRegistrationMessage(`Registration error: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Add user data to Firestore collection
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
      });

      console.log("Logged in with Google:", user);
      setRegistrationMessage("Logged in with Google. Logged in successfully.");
    } catch (error) {
      console.error("Google login error:", error.message);
      setRegistrationMessage(`Google login error: ${error.message}`);
    }
  };

  // Initialize AOS after the component is mounted
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (


    <div>
      
     


    <div className="registration-container" data-aos="fade-up">
      <h2>Register with Q-Chat</h2>
      <label>Email:</label>
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

      {registrationMessage && <p>{registrationMessage}</p>}
    </div>
    </div>
  );
};

export default Registration;
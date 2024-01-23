import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  db,
  collection,
  addDoc,
} from "./firebase";
import axios from "axios";
import "aos/dist/aos.css";
import "./Registration.css";
import logoImage from "../assets/logo.png";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        displayName: displayName,
      });
      await axios.post(
        "https://api.chatengine.io/users/",
        {
          username: email,
          secret: userCredential.user.uid,
          email: email,
        },
        {
          headers: {
            "private-key": "4ee6af7f-2fd7-4c2c-be5e-f569ac48a478",
            "project-id": "5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44",
          },
        }
      );

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

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
      });

      await axios.post(
        "https://api.chatengine.io/users/",
        {
          username: user.email,
          secret: user.uid,
          email: user.email,
        },
        {
          headers: {
            "private-key": "4ee6af7f-2fd7-4c2c-be5e-f569ac48a478",
            "project-id": "5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44",
          },
        }
      );

      console.log("Logged in with Google:", user);
      setRegistrationMessage(
        "Logged in with Google. Logged in successfully."
      );
    } catch (error) {
      console.error("Google login error:", error.message);
      setRegistrationMessage(`Google login error: ${error.message}`);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="registration-container" data-aos="fade-up">
        <h2>
          Register to{" "}
          <span className="logo-text">
            <img src={logoImage} alt="Logo" />- CHAT
          </span>
        </h2>
        <label>Qemail:</label>
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

        <p>
          Already a user? Please{" "}
          <Link to="/login" style={{ color: "#3dd276" }}>
            log in
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Registration;

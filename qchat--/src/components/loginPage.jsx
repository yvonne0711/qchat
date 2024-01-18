// LoginPage.jsx
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth, db, collection, addDoc } from "./firebase";
import { useNavigate } from "react-router-dom"; // Zaktualizowany import

import AOS from "aos";
import "aos/dist/aos.css";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate(); // Zaktualizowany hook

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      // Przenieś do panelu użytkownika
      navigate("/user-panel");

      setLoginMessage("Logged in successfully.");
    } catch (error) {
      console.error("Login error:", error.message);
      setLoginMessage(`Login error: ${error.message}`);
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

      // Przenieś do panelu użytkownika
      navigate("/user-panel");

      setLoginMessage("Logged in with Google. Logged in successfully.");
    } catch (error) {
      console.error("Google login error:", error.message);
      setLoginMessage(`Google login error: ${error.message}`);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="login-container" data-aos="fade-up">
      <h2>Login to Q-Chat</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Your Quassword:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <button onClick={handleGoogleSignIn}>Login with Google</button>

      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};

export default LoginPage;

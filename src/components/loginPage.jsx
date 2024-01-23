// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth, db, collection, addDoc } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./loginPage.css";
import logoImage from "../assets/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      navigate("/chats");
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

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
      });

      console.log("Logged in by Google:", user);
      navigate("/chats");
      setLoginMessage("Logged in with Google. Logged in successfully.");
    } catch (error) {
      console.error("Google login error:", error.message);
      setLoginMessage(`Google login error: ${error.message}`);
    }
  };

  const navigateToRegistration = () => {
    navigate("/registration");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="login-container" data-aos="fade-up">
      <h2>Welcome to
        <Link to="/" className="logo-text" onClick={navigateToHome}>
          <img src={logoImage} alt="Logo" />- CHAT
        </Link>
      </h2>
      <div className="form-container">
        <label>Qemail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Your Qassword:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGoogleSignIn}>Login with Google</button>

        <p>
          Not a user?{" "}
          <br />
          <button className="register-button" onClick={navigateToRegistration}>
            Register Here
          </button>
        </p>
      </div>
      {loginMessage && <p className="login-message">{loginMessage}</p>}
    </div>
  );
};

export default LoginPage;

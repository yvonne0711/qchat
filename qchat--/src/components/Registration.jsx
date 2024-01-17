// Registration.jsx
import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  db,
  collection,
  addDoc,
} from "./firebase";

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

      console.log("Użytkownik zarejestrowany pomyślnie:", userCredential.user);
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error.message);
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

      console.log("Zalogowano przez Google:", user);
    } catch (error) {
      console.error("Błąd podczas logowania przez Google:", error.message);
    }
  };

  return (
    <div>
      <h2>Register with QChat</h2>
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
    </div>
  );
};

export default Registration;

// Registration.jsx
import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, db, collection, addDoc } from './firebase';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Dodaj dane użytkownika do kolekcji Firestore
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        displayName: displayName,
      });

      console.log('Użytkownik zarejestrowany pomyślnie:', userCredential.user);
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error.message);
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Hasło:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>Imię i nazwisko:</label>
      <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />

      <button onClick={handleRegistration}>Zarejestruj</button>
    </div>
  );
};

export default Registration;

// FirestoreExample.jsx
import React from 'react';
import { db, collection, getDocs } from './firebase';

const FirestoreExample = () => {
  const getUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      usersSnapshot.forEach((doc) => {
        console.log('User data:', doc.data());
      });
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error.message);
    }
  };

  return (
    <div>
      <h2>Przykład Firestore</h2>
      <button onClick={getUsers}>Pobierz użytkowników z Firestore</button>
    </div>
  );
};

export default FirestoreExample;

import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from './firebase';
import { auth, signInWithPopup, googleProvider, GithubAuthProvider } from './firebase';

const FirestoreExample = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => doc.data());
      setUsers(usersData);
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Dodaj dane użytkownika do kolekcji Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        displayName: user.displayName,
      });

      console.log('Zalogowano przez Google:', user);
      getUsers(); // Pobierz użytkowników ponownie po zalogowaniu
    } catch (error) {
      console.error('Błąd podczas logowania przez Google:', error.message);
    }
  };

  useEffect(() => {
    getUsers(); // Pobierz użytkowników przy pierwszym renderowaniu
  }, []);

  return (
    <div>
      <h2>Przykład Firestore</h2>
      <button onClick={getUsers}>Pobierz użytkowników z Firestore</button>

      {/* Dodaj przycisk do logowania przez Google */}
      <button onClick={handleGoogleSignIn}>Zaloguj przez Google</button>

      {/* Wyświetl listę użytkowników */}
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.displayName}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreExample;

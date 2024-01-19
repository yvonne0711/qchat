import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate(); // Poprawione: Przenieś useNavigate do miejsca, gdzie jest dostępny wewnątrz funkcji useEffect.

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                navigate(`/chats`); // Poprawione: Używamy navigate zamiast history.push
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

}

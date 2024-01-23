// AuthContext.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                navigate(`/chats`);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const value = { user, signOut };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

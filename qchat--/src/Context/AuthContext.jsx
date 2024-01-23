import React, { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';  // Dodane: Importujemy PropTypes
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';

const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

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

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,  
};

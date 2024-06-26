import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // Update axios default authorization header whenever auth state changes
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`;
    }, [auth?.token]);

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                user: parseData.user,
                token: parseData.token,
            });
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth)); // Save auth data
    }, [auth]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

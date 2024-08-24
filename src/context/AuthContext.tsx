import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setToken(token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    };

      useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

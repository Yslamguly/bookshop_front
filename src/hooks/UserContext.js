import React  from "react";
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    rememberMe:false,
    setRememberMe: () =>{}
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(sessionStorage.getItem("token") || localStorage.getItem("token"));
    const [rememberMe,setRememberMe] = useState(!!localStorage.getItem("token"))
    return (
        <AuthContext.Provider value={{ auth, setAuth,rememberMe,setRememberMe }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

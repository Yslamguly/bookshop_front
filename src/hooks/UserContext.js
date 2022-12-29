import React  from "react";
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    userId:null,
    setUserId:() => {},
    rememberMe:false,
    setRememberMe: () =>{}
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(sessionStorage.getItem("token") || localStorage.getItem("token"));
    const [rememberMe,setRememberMe] = useState(!!localStorage.getItem("token"))
    const [userId,setUserId] = useState(null)
    return (
        <AuthContext.Provider value={{ auth, setAuth,rememberMe,setRememberMe,userId,setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

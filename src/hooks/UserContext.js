import React  from "react";
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    user:null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(sessionStorage.getItem("token"));
    const [user, setUser] = useState(null);
    useEffect(() => {
        const isAuth = () => {
            if(user){
                setUser(user)
            }
            setUser(null)
        };

        isAuth();
    }, [auth, user]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

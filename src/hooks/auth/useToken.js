import {useState} from "react";

export const useToken = () => {
    const [token,setTokenInternal] = useState(() => {
        return sessionStorage.getItem('token');
    })
    const setToken = (newToken) => {
        sessionStorage.setItem('token',newToken)
        setTokenInternal(newToken)
    }
    return [token,setToken];
}

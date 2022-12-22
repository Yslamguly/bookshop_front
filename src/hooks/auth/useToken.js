import {useState} from "react";

export const useToken = (isRememberMeChecked) => {
    const [token,setTokenInternal] = useState(() => {
        if(isRememberMeChecked){
            return localStorage.getItem('token');
        }
        else{
            return sessionStorage.getItem('token');
        }
    })
    const setToken = (newToken) => {
        if(isRememberMeChecked){
            localStorage.setItem('token',newToken)
        }
        else{
            sessionStorage.setItem('token',newToken)
        }
        setTokenInternal(newToken)
    }
    return [token,setToken];
}

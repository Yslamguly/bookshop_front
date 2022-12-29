import {useState,useEffect} from "react";
import {useToken} from "./useToken";
import {useAuth} from "../UserContext";

export const useUser = (isRememberMeChecked) =>{

    const [token] = useToken(isRememberMeChecked)
    const {setUserId} =  useAuth()

    const getPayloadFromToken = (token) => {
        const encodePayload = token.split('.')[1];
        return JSON.parse(atob(encodePayload));
    }

    const [user,setUser ] = useState(() => {
        if(!token) return null

        return getPayloadFromToken(token)
    })

    useEffect(()=>{
        if(!token){
            setUser(null)
        }
        else{
            setUser(getPayloadFromToken(token));
            setUserId(user.id)
        }
    },[token])

    return user;
}



import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useToken} from "../hooks/auth/useToken";
import {Skeleton} from "./Skeleton";
import {EmailVerificationFail} from "../pages/EmailVerificationFail";
import {EmailVerificationSuccess} from "../pages/EmailVerificationSuccess";
import {useAuth} from "../hooks/UserContext";
export const EmailVerificationLandingPage = () =>{
    const [isLoading,setIsLoading] = useState(true)
    const [isSuccess,setIsSuccess] = useState(false)
    const {verificationString} = useParams()
    const [,setToken] = useToken()
    const {setAuth} = useAuth();

    useEffect(()=>{
        const loadVerification = async () =>{
            try{
                const response = await axios.post(`http://localhost:8000/email-sender/verifyEmail`,
                    {verificationString})
                const {token} = response.data
                setToken(token)
                setAuth(true)
                setIsSuccess(true)
                setIsLoading(false)
            }catch (e){
                setIsSuccess(false)
                setIsLoading(false)
            }
        }
        loadVerification()
            // .then(()=>window.location.reload())
    },[setAuth, setToken, verificationString])

    if(isLoading)return <Skeleton/>
    if(!isSuccess)return <EmailVerificationFail/>
    if(isSuccess)return <EmailVerificationSuccess/>

}

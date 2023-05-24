import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useToken} from "../hooks/auth/useToken";
import {Skeleton} from "./Skeleton";
import {EmailVerificationFail} from "../pages/emailVerification/EmailVerificationFail";
import {EmailVerificationSuccess} from "../pages/emailVerification/EmailVerificationSuccess";
import {useAuth} from "../hooks/UserContext";
import {verifyEmail} from "../api/EmailVerificationApi";

export const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const {verificationString} = useParams()
    const [, setToken] = useToken()
    const {setAuth} = useAuth();

    useEffect(() => {
        verifyEmail(verificationString)
            .then((response) => {
                const {token} = response.data
                setToken(token)
                setAuth(true)
                setIsSuccess(true)
                setIsLoading(false)
            }).catch(() => {
            setIsSuccess(false)
            setIsLoading(false)
        })
    }, [setAuth, setToken, verificationString])

    if (isLoading) return <Skeleton/>
    if (!isSuccess) return <EmailVerificationFail/>
    if (isSuccess) return <EmailVerificationSuccess/>

}

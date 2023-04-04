import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useToken} from "../hooks/auth/useToken";
import logo from '../assets/inkwellBook.svg'
import {useAuth} from "../hooks/UserContext";
import ErrorMessage from "../components/ErrorMessage";
import {useQueryParams} from "../utils/useQueryParams";

export default function SignIn() {
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false)
    const [, setToken] = useToken(isRememberMeChecked)
    const [errorMessage, setErrorMessage] = useState()
    const [showError, setShowError] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [googleOauthUrl , setGoogleOauthUrl] = useState()
    const {token:oauthToken} = useQueryParams()
    const navigate = useNavigate();
    const {setAuth, setRememberMe, rememberMe} = useAuth();

    useEffect(()=>{
        if(oauthToken){
            setToken(oauthToken);
            setAuth(true)
            navigate("/books")
            window.location.reload();
        }
    },[oauthToken,setToken,navigate])

    useEffect(()=>{
        axios.get('http://localhost:8000/auth/google/url')
            .then((response)=>{
                const {url} = response.data
                setGoogleOauthUrl(url)
            })
            .catch((e)=>console.error(e))
    },[])

    const onRememberMeClicked = () => {
        setRememberMe(!rememberMe)
        setIsRememberMeChecked(!rememberMe)
    }
    const onLoginClicked = async () => {
        try {
            const response = await axios.post('http://localhost:8000/customers/login', {
                email_address: emailValue,
                password: passwordValue
            });
            const {token} = response.data
            setToken(token)
            setAuth(true)
            navigate("/books")
            window.location.reload();
        } catch (e) {
            if (e.code === 'ERR_NETWORK') {
                navigate("/500")
            }
            setErrorMessage(e.response.data.message)
            setShowError(true)
        }
    }
    return (
        <>
            <ErrorMessage showError={showError}
                          setShowError={(bool) => setShowError(bool)}
                          header={'Error'}
                          description={errorMessage}/>

            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600"></p>
                    </div>
                    <div className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={e => setEmailValue(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={e => setPasswordValue(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={onRememberMeClicked}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href={'/forgot-password'}
                                   className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password? |
                                </a>
                                <a href={'/signup'} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    | Create new account
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={onLoginClicked}

                                type={"submit"}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                </span>Sign in
                            </button>
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                    className="mx-4 mb-0 text-center font-semibold dark:text-neutral-700">
                                    OR
                                </p>
                            </div>
                            <button type="button"
                                    disabled={!googleOauthUrl}
                                    onClick={()=>{window.location.href = googleOauthUrl}}
                                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false"
                                     data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 488 512">
                                    <path fill="currentColor"
                                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

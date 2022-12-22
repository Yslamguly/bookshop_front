import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useToken} from "../hooks/auth/useToken";
import logo from '../assets/undraw_education_f8ru.svg'
import {useAuth} from "../hooks/UserContext";

export default function SignIn() {
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false) //create a function that changes state and sets the global user to true
    const [token, setToken] = useToken(isRememberMeChecked)
    const [errorMessage, setErrorMessage] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const navigate = useNavigate();
    const {setAuth, setRememberMe, rememberMe} = useAuth();
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
            window.location.reload(true);
        } catch (e) {
            setErrorMessage(true)
        }
    }
    return (
        <>
            {errorMessage &&
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">Invalid email or password.</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                 onClick={() => setErrorMessage(false)}
                 viewBox="0 0 20 20"><title>Close</title><path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
            }
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
                                <a href={'/forgot_password'}
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
                                // type={"submit"}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

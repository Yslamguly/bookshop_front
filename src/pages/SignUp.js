import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useToken} from "../hooks/auth/useToken";
import logo from '../assets/undraw_education_f8ru.svg'
import {useAuth} from "../hooks/UserContext";


export function SignUp() {
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false) //create a function that changes state and sets the global user to true
    const [token, setToken] = useToken(isRememberMeChecked)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate = useNavigate();
    const {setAuth, setRememberMe, rememberMe} = useAuth();

    function areInputsEmpty(){
        return !lastName||!firstName||!emailValue|| !passwordValue || passwordValue!==confirmPasswordValue
    }
    const onRememberMeClicked = () => {
        setRememberMe(!rememberMe)
        setIsRememberMeChecked(!rememberMe)
    }
    const onCreateButtonClick = async () => {
        if(areInputsEmpty()){
            setErrorMessage('Please fill in all the fields!')
            setShowErrorMessage(true)
            return
        }
        try{
            const response = await axios.post(`http://localhost:8000/customers/register`,{
                first_name: firstName,
                last_name: lastName,
                email_address: emailValue,
                phone_number: phoneNumber,
                password: passwordValue,
                confirm_password: confirmPasswordValue
            });
            const {token} = response.data
            setToken(token)
            setAuth(true)
            navigate("/books")
            window.location.reload(true);
        }catch (e){
            setShowErrorMessage(true)
            setErrorMessage('Password must be between 6-20 chars and contain uppercase and lowercase letters!')
        }
        // await axios.post('http://localhost:8000/customers/register', {
        //     first_name: firstName,
        //     last_name: lastName,
        //     email_address: emailValue,
        //     phone_number: phoneNumber,
        //     password: passwordValue,
        //     confirm_password: confirmPasswordValue
        // }).then((response) => {
        //     const {token} = response.data
        //     setToken(token)
        //     setAuth(true)
        //     navigate("/books")
        //     window.location.reload(true);
        // })
        //     .catch(() => setShowErrorMessage(true))
        //     .then(()=>setErrorMessage('Password must be between 6-20 chars and contain uppercase and lowercase letters!'))
        //     // .catch(() => navigate('/signup'))
    }
    return (
        <>
            {showErrorMessage &&
            <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                 role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Danger</span>
                <div>
                    <span className="font-medium">Ensure that these requirements are met:</span>
                    <ul className="mt-1.5 ml-4 text-red-700 list-disc list-inside">
                        <li>The password should be between 6 to 20 characters</li>
                        <li>At least one lowercase character and an uppercase character</li>
                        <li>Inclusion of at least one numeric digit</li>
                    </ul>
                </div>
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
                            Create an Account
                        </h2>
                        {/*<p className="mt-2 text-center text-sm text-gray-600">afae</p>*/}
                    </div>
                    <div className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="first-name" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    id="first-name"
                                    name="name"
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
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
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={(e) => setEmailValue(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone-number" className="sr-only">
                                    Phone Number
                                </label>
                                <input
                                    id="phone-number"
                                    name="phone-number"
                                    type="number"
                                    required
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Phone number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPasswordValue(e.target.value)}
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
                                <a href={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Login as an Existing Customer
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                // disabled={!lastName||!firstName||!emailValue|| !passwordValue || passwordValue!==confirmPasswordValue}
                                onClick={onCreateButtonClick}
                                // type={"submit"}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>Create
                            </button>
                        </div>
                    </div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        By creating an account, you agree to Bookshop’s <a className={'text-indigo-600'} href={'#'}>Privacy
                        Notice</a> and <a className={'text-indigo-600'} href={'#'}>Terms of Use.</a>
                    </p>
                </div>
            </div>
        </>
    )
}


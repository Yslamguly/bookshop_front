import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {forgotPassword} from "../../api/ResetPasswordApi";

export const ForgotPassword = () =>{
    const [errorMessage,setErrorMessage] = useState('')
    const [success,setSuccess] = useState(false)
    const [email,setEmail] = useState('')
    const navigate = useNavigate()
    const onSubmit = () =>{
        forgotPassword(email)
            .then(()=>setSuccess(true))
            .then(()=>setTimeout(()=>navigate('/login'),3000))
            .catch((e)=>setErrorMessage(e.message))
    }
    return success ?(
        <div>
            <h1>success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ):(
        <div className="flex justify-center items-center h-96 mt-3 mb-3">
            <div className="w-full max-w-sm p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Forgot Password</h5>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Enter your email we send you a reset link</p>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            email</label>
                        <input type="email" name="email" id="email"
                               value={email}
                               onChange={(e)=>setEmail(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                               placeholder="test@mail.com" required/>
                    </div>
                    <button type="submit"
                            onClick={()=>onSubmit()}
                            disabled={!email}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Send a reset link
                    </button>
                </div>
            </div>

            <div>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
        </div>
    )
}

import {useState} from "react";
import {useParams} from "react-router-dom";
import {PasswordResetSuccess} from "./PasswordResetSuccess";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import {PasswordResetFail} from "./PasswordResetFail";
import {resetPassword} from "../../api/ResetPasswordApi";

export const PasswordResetLandingPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [isFailure,setIsFailure] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {passwordResetCode} = useParams()
    if (isFailure) return (<PasswordResetFail/>)
    if (isSuccess) return (<PasswordResetSuccess/>)

    const  onSubmit = () => {
        resetPassword(passwordResetCode,password,confirmPassword)
            .then(()=>setIsSuccess(true))
            .catch((error)=> {
                if(error.response.status === 400){
                    setErrorMessage('Password must be between 6-20 chars and contain uppercase and lowercase letters!')
                    setIsFailure(true)
                }
                if(error.response.status === 500){
                    window.location.href = '/500'
                }
            })
    }

    return (
        <div className="flex justify-center items-center h-96 mt-3 mb-3">
            <ErrorMessage
                showError={isFailure}
                setShowError={(bool) => setIsFailure(bool)}
                header={'Error'}
                description={errorMessage}
            />
            <div
                className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Change Password</h5>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password"
                               onChange={(e) => setPassword(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                               placeholder="Password" required/>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                            Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword"
                               placeholder="Confirm Password"
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                               required/>
                    </div>
                    <button type="submit"
                            onClick={()=>onSubmit()}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            disabled={!password||!confirmPassword || password!==confirmPassword}>
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    )
}

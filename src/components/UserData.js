import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import {useEffect, useState} from "react";
import {useUser} from "../hooks/auth/useUser";
import {useAuth} from "../hooks/UserContext";
import {useToken} from "../hooks/auth/useToken";
import ErrorMessage from "./ErrorMessage";
import {logout} from "../hooks/auth/logout";
import {getUserData, updateCustomerData} from "../api/CustomerApi";
import SuccessMessage from "./SuccessMessage";

export default function UserData() {
    const user = useUser();
    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [changesMade, setChangesMade] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null)
    const {rememberMe, setAuth, userId} = useAuth()
    const [token] = useToken(rememberMe)
    useEffect(() => {
        getUserData(token, userId)
            .then((response) => {
                setFirst_name(response.data[0].first_name)
                setLast_name(response.data[0].last_name)
                setPhoneNumber(response.data[0].phone_number)

            }).catch((e) => {
            if (e.response.status === 500) {
                window.location.pathname = "/500"
            }
            if (e.response.status === 401) {
                logout()
                setAuth(false)
                setShowError(true)
                setAlertMessage('Please, login to perform the operation')
            }
        })
    }, [user])

    const areInputsEmpty = () => !first_name || !last_name

    const onSave = () => {
        if (changesMade) {
            if (areInputsEmpty()) {
                setAlertMessage('Please fill in the required fields!')
                setShowError(true)
            } else {
                updateCustomerData(token, userId, first_name, last_name, phoneNumber)
                    .then((response) => {
                        setShowSuccess(true)
                        setAlertMessage('Data has been updated.')
                        setFirst_name(response.data[0].first_name)
                        setLast_name(response.data[0].last_name)
                        setPhoneNumber(response.data[0].phone_number)
                    }).catch((e) => {
                    if (e.response.status === 500) {
                        window.location.pathname = "/500"
                    } else if (e.response.status === 400) {
                        const message = e.response.data
                        setAlertMessage(Object.values(message)[0]);
                        setShowError(true)
                    }
                })
            }
        }
    }
    const onCancel = () => {
        setFirst_name(user.first_name)
        setLast_name(user.last_name)
        setPhoneNumber(user.phone_number)
    }
    return (<div>
        <div className="space-y-12">
            <ErrorMessage
                showError={showError}
                setShowError={(bool) => setShowError(bool)}
                header={'Error'}
                description={alertMessage}
            />
            <SuccessMessage
                showSuccess={showSuccess}
                setShowSuccess={(bool) => setShowSuccess(bool)}
                header={'Success'}
                description={alertMessage}
            />
            <div className="border-b border-gray-900/10 pb-12">
                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true"/>
                            <button
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Change
                            </button>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Cover photo
                        </label>
                        <div
                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                {/*<p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>*/}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                defaultValue={first_name}
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setFirst_name(e.target.value)
                                    setChangesMade(true)
                                }}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                defaultValue={last_name}
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setLast_name(e.target.value)
                                    setChangesMade(true)
                                }}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone number
                        </label>
                        <div className="mt-2">
                            <input
                                defaultValue={phoneNumber}
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                autoComplete="phone_number"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                    setChangesMade(true)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={onCancel}>
                Cancel
            </button>
            <button
                onClick={onSave}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>
        </div>
    </div>)
}

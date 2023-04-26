import PurchasedItem from "../components/PurchasedItem";
import axios from "axios";
import {useAuth} from "../hooks/UserContext";
import {useToken} from "../hooks/auth/useToken";
import {logout} from "../hooks/auth/logout";
import {useState} from "react";
import ErrorMessage from "../components/ErrorMessage";
import UserData from "../components/UserData";
import no_data_illustration from "../assets/no-data-illustration.svg";

export default function UserProfile() {
    const [purchases, setPurchases] = useState([])
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [activeComponent, setActiveComponent] = useState('UserData')
    const {userId} = useAuth()
    const {rememberMe, setAuth} = useAuth()
    const [token] = useToken(rememberMe)
    const onShowMyData = (componentName) => {
        setActiveComponent(componentName)
    }
    const onShowMyPurchases = async (componentName) => {
        await getUserPurchases()
        console.log(purchases.length)
        setActiveComponent(componentName)
    }
    const getUserPurchases = async () => {
        await axios.get(`http://localhost:8000/orders/getUserOrders/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setPurchases(response.data)
            console.log(response.data)
        })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                    setAuth(false)
                    setShowError(true)
                    setErrorMessage('Please, login to perform the operation')
                }
                if (error.response.status === 500) {
                    window.location.pathname = "/500"
                }
            })
    }
    return (
        <div className="bg-white">
            <ErrorMessage
                showError={showError}
                setShowError={(bool) => setShowError(bool)}
                header={'Error'}
                description={errorMessage}
            />
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">My Profile</h1>
                    </div>
                    <section aria-labelledby="products-heading" className="pb-2 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <div className="block">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    className="space-y-4 border-gray-200 pb-6 text-sm font-medium text-gray-900">

                                    <li>
                                        <button onClick={() => onShowMyData('UserData')}>My data</button>
                                    </li>
                                    <li>
                                        <button onClick={() => onShowMyPurchases('UserPurchases')}>My purchases</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="lg:col-span-3">
                                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar max-h-96 w-full">
                                    <div className="flex flex-col lg:ml-40 md:ml-20 ml-10 w-full ">
                                        {activeComponent === 'UserData' && <UserData/>}
                                        {activeComponent === 'UserPurchases' ? (
                                            purchases.length > 0 ? (
                                                purchases.map((product, index) => (
                                                    <div className="inline-block px-3 py-3 w-full" key={index}>
                                                        <div className="w-120 px-3 py-3 lg:h-32 sm:h-48 flex justify-between overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                                            <PurchasedItem product={product} />
                                                            <img src={`${product.image}`} className="w-30 rounded-lg h-28" alt={'book cover'} />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <img
                                                    className="mx-auto max-w-full h-96 "
                                                    src={no_data_illustration}
                                                    alt="no data found"
                                                />
                                            )
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

//TODO check purchases for empty array and display no data if array is empty

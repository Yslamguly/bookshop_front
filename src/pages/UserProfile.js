import PurchasedItem from "../components/PurchasedItem";
import axios from "axios";
import {useAuth} from "../hooks/UserContext";
import {useToken} from "../hooks/auth/useToken";
import {logout} from "../hooks/auth/logout";
import {useState} from "react";
import ErrorMessage from "../components/ErrorMessage";

export default function UserProfile() {
    const [purchases,setPurchases] = useState([])
    const [showError, setShowError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const {userId} = useAuth()
    const {rememberMe, setAuth} = useAuth()
    const [token] = useToken(rememberMe)
    const  getUserPurchases = () =>{
        axios.get(`http://localhost:8000/orders/getUserOrders/${userId}`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((response)=>{
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
    const  getUserData = () =>{
        axios.get(`http://localhost:8000/customers/getCustomerData/${userId}`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((response)=>console.log(response.data))
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
                                        <button onClick={getUserData}>My data</button>
                                    </li>
                                    <li>
                                        <button onClick={getUserPurchases}>My purchases</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="lg:col-span-3">
                                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar max-h-96 w-full">
                                    <div className="flex flex-col lg:ml-40 md:ml-20 ml-10 w-full ">
                                        {purchases.map((product,index)=>(
                                            <div className="inline-block px-3 py-3 w-full">
                                                <div
                                                    className="w-120 px-3 py-3 lg:h-32 sm:h-48 flex justify-between overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                                    <PurchasedItem product={product}/>
                                                    <img
                                                        src={`${product.image}`}
                                                        className=" w-30 rounded-lg h-28"
                                                        alt={'book cover'}/>
                                                </div>
                                            </div>
                                        ))}
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

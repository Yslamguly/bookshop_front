import {ShoppingCartIcon} from '@heroicons/react/24/outline'
import {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {motion} from "framer-motion"
import {Link} from "react-router-dom";
import axios from "axios";
import {logout} from "../hooks/auth/logout";
import {useAuth} from "../hooks/UserContext";
import {useToken} from "../hooks/auth/useToken";
import ErrorMessage from "./ErrorMessage";
import {cart_items} from "../components/NonAuthShoppingCart";
import AddedBookNotification from "./AddedBookNotification";


export const BooksGrid = (props) => {
    const [token] = useToken()
    const {userId, setAuth} = useAuth()
    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [lastlyAddedProduct,setLastlyAddedProduct] = useState({})

    useEffect(() => {
        AOS.init();
    }, []);

    function onAddToShoppingCart(product) {
        axios.post(`http://localhost:8000/shopping_cart/addBook/${userId}`, {
            book_id: product.id,
            price: product.selling_price
        }, {
            headers: {authorization: `Bearer ${token}`}
        }).then(() => {
            setLastlyAddedProduct(product)
            setShowSuccess(true)
        }).catch((error) => {
            if (error.response.status === 401) {
                logout()
                setAuth(false)
                window.location.pathname = "/401"
            } else {
                setShowError(true)
                console.error(error)
            }
        })
    }

    if (props.books.length > 0) {
        return (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                    <AddedBookNotification showSuccess={showSuccess} setShowSuccess={(bool)=>setShowSuccess(bool)} product={lastlyAddedProduct} />
                    <ErrorMessage
                        showError={showError}
                        setShowError={(bool)=>setShowError(bool)}
                        header={'Error'}
                        description={'It looks like you already have this book in your shopping cart.'}
                    />
                    {props.books.map((product) => (
                        <div className="py-2" key={product.id}>
                            <div className="col-span-1 flex flex-col bg-white border-2 p-4 h-full justify-between"
                                 data-aos-once="true" data-aos="zoom-in-up">
                                <Link to={`/books/${product.id}`} key={product.id} href={"/book"}>
                                    <motion.img
                                        whileHover={{scale: 1.06}}
                                        src={product.image}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </Link>
                                <div className="mb-2 pb-2">
                                    <Link to={`/books/${product.id}`}><h3
                                        className="mt-4 text-sm font-medium text-gray-900 hover:text-indigo-700">{product.title}</h3>
                                    </Link>
                                    <p className="mt-2 text-sm text-gray-700">Jane Austin</p>
                                    <div className="flex flex-row justify-between">
                                        <p className="mt-1 text-lg font-medium text-indigo-700">{product.selling_price + "$"}</p>
                                        <button
                                            onClick={() => onAddToShoppingCart(product)}
                                            className={`hover:bg-indigo-700 px-2 text-md font-medium bg-indigo-600 text-gray-200 rounded`}>
                                            <ShoppingCartIcon className="h-5 w-5" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        )
    } else {
        return (<h3>Loading...</h3>)
    }

}

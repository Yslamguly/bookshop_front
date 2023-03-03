import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import axios from "axios";
import {useToken} from "../hooks/auth/useToken";
import {useAuth} from "../hooks/UserContext";
import {logout} from "../hooks/auth/logout";
import empty_cart from "../assets/empty_cart.svg";
import ErrorMessage from "../components/ErrorMessage";
import {cart_items} from "../components/NonAuthShoppingCart";

export const ShoppingCart = (props) => {
    const [books, setBooks] = useState([]);
    const [showError, setShowError] = useState(false)
    const {userId} = useAuth()
    const {rememberMe, setAuth} = useAuth()
    const [token] = useToken(rememberMe)
     function  fetchAuthShoppingCart() {
        axios.get(`http://localhost:8000/shopping_cart/${userId}`, {
            headers: {authorization: `Bearer ${token}`}
        }).then((response) => {
            const allBooks = response.data
            setBooks(allBooks)
        })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                    setAuth(false)
                    window.location.pathname = "/401"
                }
                if (error.response.status === 500) {
                    window.location.pathname = "/500"
                }
            })
    }
    useEffect(() => {
        if (userId) {
            fetchAuthShoppingCart()
        }
    }, [books,userId])
    const onRemoveClick = (bookId) => {
        if (!userId) {
            setBooks(cart_items.filter(book => book.id !== bookId))
            console.log(books)
            // setBooks(books.filter(book=>book.id!==bookId))
        } else {
            axios.delete(`http://localhost:8000/shopping_cart/deleteBook/${userId}`, {
                data: {shopping_cart_item_book_id: bookId},
                headers: {authorization: `Bearer ${token}`}
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                if (error.response.status === 401) {
                    logout()
                    setAuth(false)
                    // window.location.pathname = "/401"
                } else {
                    setShowError(true)
                    console.error(error)
                }
            })
        }
    }
    const onQuantityChange = (quantity, bookId, price) => {
        axios.patch(`http://localhost:8000/shopping_cart/updateQuantity/${userId}`, {
            book_id: bookId,
            quantity: quantity,
            total_price: quantity * price
        }, {
            headers: {authorization: `Bearer ${token}`}
        }).then((response) => {
            console.log(response.data)
        }).catch(error => {
            if (error.response.status === 401) {
                logout()
                setAuth(false)
                // window.location.pathname = "/401"
            } else {
                window.location.pathname = "/500"
                console.log(error)
            }
        })
    }

    const onCheckoutClick = () => {
        axios.post('http://localhost:8000/stripe/create-checkout-session',{
            books:books,
            userId: userId
        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=>console.error(err))
    }
    const calculateSubtotal = () => {
        let sum = 0;
        books.map((product) => (
            sum += product.quantity * product.selling_price
        ))
        return sum
    }

    return (
        <>
            <ErrorMessage
                showError={showError}
                setShowError={(bool) => setShowError(bool)}
                header={'Error'}
                description={'Error happened, please try again.'}
            />
            {/*<SessionExpiredBanner/>*/}
            <Transition.Root show={props.showShoppingCart} as={Fragment}>
                <Dialog as="div" className="relative z-1000" onClose={() => props.setShowShoppingCart(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping
                                                        cart</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => props.setShowShoppingCart(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                {books.length > 0 ?
                                                    <div className="mt-8">
                                                        <div className="flow-root">
                                                            <ul className="-my-6 divide-y divide-gray-200">
                                                                { books.map((product) => (

                                                                    <li key={product.id} className="flex py-6">
                                                                        <div
                                                                            className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                            <img
                                                                                src={product.image}
                                                                                alt="book cover"
                                                                                className="h-full w-full object-cover object-center"
                                                                            />
                                                                        </div>

                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div
                                                                                    className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <a href={product.href}>{product.title}</a>
                                                                                    </h3>
                                                                                    <p className="ml-4">{product.selling_price}$</p>
                                                                                </div>
                                                                                <p className="mt-1 text-sm text-gray-500">{`${product.first_name}  ${product.last_name}`}</p>
                                                                                <p className="mt-1 text-sm text-gray-500">Total
                                                                                    price: {product.total_price}$</p>
                                                                            </div>
                                                                            <div
                                                                                className="flex flex-1 items-end justify-between text-sm">
                                                                                <p className="text-gray-500">Qty</p>
                                                                                <div className='relative'>
                                                                                    <input type={"number"}
                                                                                           min={1}
                                                                                           className='block p-0 m-0  text-xs border-0 rounded w-11 h-5 leading-relaxed float-left'
                                                                                           defaultValue={product.quantity}
                                                                                           onChange={(e) => onQuantityChange(e.target.value, product.id, product.selling_price)}
                                                                                    />
                                                                                </div>
                                                                                <div className="flex">
                                                                                    <button
                                                                                        onClick={() => onRemoveClick(product.id)}
                                                                                        type="button"
                                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                    >
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div> :
                                                    <div>
                                                        <img
                                                            className="mx-auto max-w-full h-screen "
                                                            src={empty_cart}
                                                            alt="no data found"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => props.setShowShoppingCart(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                            {books.length > 0 &&
                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div
                                                    className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>{calculateSubtotal()}$</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes
                                                    calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <a
                                                        onClick={() => onCheckoutClick()}
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                                <div
                                                    className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => props.setShowShoppingCart(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}


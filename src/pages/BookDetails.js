import {useParams, useNavigate} from "react-router-dom";
import {ShoppingBagIcon} from '@heroicons/react/24/outline'
import {useEffect, useState} from "react";
import axios from "axios";
import {Skeleton} from "../components/Skeleton";
import {useToken} from "../hooks/auth/useToken";
import {useAuth} from "../hooks/UserContext";
import {logout} from "../hooks/auth/logout";
import {cart_items} from "../components/NonAuthShoppingCart";

export const BookDetails = () => {
    const {bookId} = useParams()
    const navigate = useNavigate();
    const [book, setBook] = useState()
    const [bookDescription, setBookDescription] = useState()
    const [active, setActive] = useState(false)
    const [token] = useToken()
    const {userId, setAuth} = useAuth()
    useEffect(() => {
        axios.get(`http://localhost:8000/books/details?book_id=${bookId}`)
            .then((response) => {
                const book = response.data;
                setBook(book)
                const description = book.description
                return axios.get(`${description}`).then((response) => {
                    const res = response.data.query.pages
                    const pageId = Object.keys(res)[0]
                    setBookDescription(response.data.query.pages[pageId]["extract"])

                }).catch((error) => console.error(error))
            })
            .catch(error => {
                console.error(error)
                navigate('*')
            })
    }, [])
    const onAddToCartClicked = async () => {
        if (!userId) {
            cart_items.push(book)
        }
        if (userId) {
            await axios.post(`http://localhost:8000/shopping_cart/addBook/${userId}`, {
                book_id: book.id,
                price: book.selling_price
            }, {
                headers: {authorization: `Bearer ${token}`}
            })
                .then((response) => {
                    setActive(true)
                    setTimeout(() => {
                        setActive(false)
                    }, 2000)
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        logout()
                        setAuth(false)
                        window.location.pathname = "/401"
                    } else {
                        console.error(error)
                    }
                })
        }
    }


    if (book) {
        return (
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className=" px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="book"
                             className="lg:w-1/2 w-full px-4 py-4 h-1/5 object-cover object-center rounded border border-gray-200"
                             src={book.image}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{book.first_name + '' + book.last_name}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{book.title}</h1>
                            <div className="flex flex-col mb-4">
                                <span className="text-gray-600 mt-4 font-bold">ISBN:
                                    <span className="text-gray-800 pl-1">{book.isbn}</span>
                                </span>
                                <span className="text-gray-600 mt-2 font-bold">Publication year:
                                    <span className="text-gray-800 pl-1">{book.publication_year}</span>
                                </span>
                                <span className="text-gray-600 mt-2 font-bold">Page number:
                                    <span className="text-gray-800 pl-1">{book.page_number}</span>
                                </span>
                            </div>
                            {bookDescription &&
                            <div>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Description</h1>
                                <p className="leading-relaxed whitespace-pre-line">{bookDescription}</p>
                                <h1 className="text-sm title-font pt-3 italic text-gray-500 tracking-widest">Source:
                                    Wikipedia</h1>
                            </div>}


                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                 <span className="mt-2 font-semibold">
                                    {book.quantity_in_stock > 2 ? <span className="text-green-600">In stock.</span> :
                                        <span className="text-red-600">Currently unavailable.</span>}
                                </span>
                            </div>
                            <div className="flex">
                                <span
                                    className="title-font font-medium text-2xl text-gray-900">${book.selling_price}</span>
                                <button
                                    onClick={onAddToCartClicked}
                                    className={`flex ml-auto ${active ? "bg-green-600 hover:bg-green-600" : "bg-indigo-600"} text-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded`}
                                >
                                    {active ? "Added to cart" : "Add to cart"}
                                </button>
                                <button
                                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4 ">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                         strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    } else {
        return (
            <Skeleton/>
        )
    }
}

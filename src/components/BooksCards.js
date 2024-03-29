import {useEffect, useState} from "react";
import AOS from "aos";
import {logout} from "../hooks/auth/logout";
import {useToken} from "../hooks/auth/useToken";
import {useAuth} from "../hooks/UserContext";
import AddedBookNotification from "./AddedBookNotification";
import ErrorMessage from "./ErrorMessage";
import {addBookToShoppingCart} from '../api/ShoppingCartApi'
import {getBooksDescription} from '../api/BooksApi'
import {trimStringsInArray} from '../utils/functions'
import {Skeleton} from "./Skeleton";

export const BooksCards = (props) => {
    const [token] = useToken()
    const {userId, setAuth} = useAuth()
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [lastlyAddedProduct, setLastlyAddedProduct] = useState({})
    const [descriptions, setDescription] = useState([])
    useEffect(() => {
        const desc = []
        const fetchDescriptions = async () => {
            for (let i = 0; i < props.books.length; i++) {
                const d = await getBooksDescription(props.books[i])
                desc.push(d)
            }
        }
        fetchDescriptions()
            .then(() => trimStringsInArray(desc,0,250))
            .then(() => setDescription(desc))
            .then(AOS.init())
    }, []);

    // console.log(descriptions)
    function onAddToShoppingCart(product) {
        addBookToShoppingCart(product, userId, token)
            .then(() => {
                setLastlyAddedProduct(product)
                setShowSuccess(true)
            }).catch((error) => {
                console.log(error)
            if (error.response.status === 401) {
                logout()
                setAuth(false)
                setShowError(true)
                setErrorMessage('You need to login to perform this operation')
                // window.location.pathname = "/401"
            }
            if (error.response.status === 409) {
                setShowError(true)
                setErrorMessage('It looks like you already have this book in your shopping cart.')
                console.error(error)
            }
            if (error.response.status === 500) {
                window.location.pathname = "/500"
            }
        })

    }

    if (descriptions.length !== props.books.length) {
        return <Skeleton/>
    } else {
        return (
            <div className="flex flex-col items-center m-3 bg-white">
                <AddedBookNotification showSuccess={showSuccess} setShowSuccess={(bool) => setShowSuccess(bool)}
                                       product={lastlyAddedProduct}/>
                <ErrorMessage
                    showError={showError}
                    setShowError={(bool) => setShowError(bool)}
                    header={'Error'}
                    description={errorMessage}
                />
                {props.books.map((book, i) => (
                    <div className="flex flex-col border-b-[1px] items-center bg-white  m-3 md:flex-row md:max-w-xl"
                         key={book.id} data-aos-once="true" data-aos="zoom-in-up">
                        <img
                            className="h-full w-full object-cover object-center rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-lg hover:scale-105 ease-in duration-300"
                            src={book.image} alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <a href={`books/${book.id}`}
                               className="mb-1 text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-600 ">{book.title}</a>
                            <p className="mb-1 text-sm text-gray-700">{book.first_name + ' ' + book.last_name}</p>
                            <p className="mb-1 text-sm text-gray-700 font-bold">{'$' + book.selling_price}</p>
                            <p className="mb-3 font-normal text-gray-800 w-full">{`${descriptions[i]}...`}
                                <a href={`books/${book.id}`}>
                                    <span className="font-bold text-gray-500 underline">more</span>
                                </a>
                            </p>

                            <button
                                className={`ml-auto bg-indigo-600 hover:bg-indigo-700-600  text-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded`}
                                onClick={() => onAddToShoppingCart(book)}
                            >
                                Add to cart
                            </button>
                        </div>

                    </div>
                ))}


                {/*<a href="#"*/}
                {/*   className="flex flex-col items-center bg-white border border-gray-200 rounded-lg m-3 shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">*/}
                {/*    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"*/}
                {/*         src="https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg" alt=""/>*/}
                {/*    <div className="flex flex-col justify-between p-4 leading-normal">*/}
                {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy*/}
                {/*            technology acquisitions 2021</h5>*/}
                {/*        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise*/}
                {/*            technology acquisitions of 2021 so far, in reverse chronological order.</p>*/}
                {/*    </div>*/}
                {/*</a>*/}
            </div>
        )
    }
}


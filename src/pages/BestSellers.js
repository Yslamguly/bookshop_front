import {BooksCards} from "../components/BooksCards";
import {useEffect, useState} from "react";
import axios from "axios";
import no_data_illustration from "../assets/no-data-illustration.svg";
import book_lover_icon from "../assets/undraw_book_lover_re_rwjy.svg";

export const BestSellers = () =>{
    const [books,setBooks] = useState([])


    useEffect(()=>{
        axios.get('http://localhost:8000/books/bestSellers')
            .then((response)=>{
                setBooks(response.data)
            })
            .catch(error=>console.log(error))
    },[])
    return(
        <div className="mb-auto max-w-2xl   sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
            <div
                className="mt-3 py-20 flex flex-row rounded w-full bg-gradient-to-r from-indigo-400 via-violet-900 to-indigo-500">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                        Best Selling Books
                    </h2>
                    <h3 className="text-2xl mb-8 text-gray-200">
                        Here are the best selling books of the shop!
                    </h3>
                </div>
                <img className="-mb-12 pr-5 w-40 lg:w-56"
                     src={book_lover_icon} alt={"book_lover_illustration"}/>

            </div>
            { books.length > 0 ?<BooksCards books={books}/> :
                <img
                    className="mx-auto max-w-full h-screen "
                    src={no_data_illustration}
                    alt="no data found"
                />}
        </div>

    )
}

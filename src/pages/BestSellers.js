import {BooksCards} from "../components/BooksCards";
import {useEffect, useState} from "react";
import axios from "axios";
import no_data_illustration from "../assets/no-data-illustration.svg";

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
            { books.length > 0 ?<BooksCards books={books}/> :
                <img
                    className="mx-auto max-w-full h-screen "
                    src={no_data_illustration}
                    alt="no data found"
                />}
        </div>

    )
}

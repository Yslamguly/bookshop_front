import {useEffect, useState} from "react";
import {Filters} from "../components/Filters";
import {BooksGrid} from "../components/BooksGrid";
import no_data_illustration from "../assets/no-data-illustration.svg"
import axios from "axios";
import Pagination from "../components/Pagination";
import {SortOptions} from "../components/SortOptions";



export default function Books() {
    const [sortOption,setSortOption] = useState()
    const [priceFrom,setPriceFrom] = useState(0)
    const [priceTo,setPriceTo] = useState(500)
    const [publicationYearFrom,setPublicationYearFrom] = useState(0)
    const [publicationYearTo,setPublicationYearTo] = useState(new Date().getFullYear().toString())
    const [books,setBooks] = useState([])
    const [categories,setCategories] = useState([])
    const [categoryId,setCategoryId] = useState()
    const [limitPerPage] = useState(15)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalBooks,setTotalBooks] = useState()

    useEffect( ()=>{
        axios.get(`http://localhost:8000/books?page=${currentPage}&limit=${limitPerPage}&selling_price_from=${priceFrom}&selling_price_to=${priceTo}&publication_year_from=${publicationYearFrom}&publication_year_to=${publicationYearTo}&sort_value=id`)
            .then((response)=>{
                const allBooks = response.data.outcome
                setBooks(sortElements(sortOption,allBooks))
                console.log(allBooks)
                setTotalBooks(response.data.total_items)
                return axios.get('http://localhost:8000/categories')
            }).then((response)=>{
                setCategories(response.data)
        }).catch(error=>console.error(`Error: ${error}`))
    },[currentPage,sortOption])

    const onApplyFiltersClick = ()=>{
        axios.get(`http://localhost:8000/books?page=1&limit=${limitPerPage}&selling_price_from=${priceFrom}&selling_price_to=${priceTo}&publication_year_from=${publicationYearFrom}&publication_year_to=${publicationYearTo}&sort_value=id&category_id=${categoryId}`)
            .then((response)=>{
                const allBooks = response.data.outcome
                setBooks(sortElements(sortOption,allBooks))
                setTotalBooks(response.data.total_items)
            })
            .catch(error=>console.error(`Error: ${error}`))
    }
    const onPreviousPageClick = () =>{
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const onNextPageClick = () =>{
        if(totalBooks/limitPerPage === 0){
            return
        }
        if (currentPage !== Math.ceil(totalBooks / limitPerPage)) {
            setCurrentPage(currentPage + 1);

        }
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const sortElements = (options,array) =>{
        switch (options){
            case
                "Date: new to old": return [...array].sort((a, b) => b.publication_year - a.publication_year)
            case
                "Date: old to new": return [...array].sort((a, b) => a.publication_year - b.publication_year)
            case
                "A-Z": return [...array].sort((a, b) => a.title > b.title ? 1 : -1)
            case
                "Z-A": return [...array].sort((a, b) => a.title > b.title ? -1 : 1)
            case
                "Price: high to low": return [...array].sort((a, b) => b.selling_price - a.selling_price)
            case
                "Price: low to high": return [...array].sort((a, b) => a.selling_price - b.selling_price)
            default:
                return [...array].sort((a, b) => b.id - a.id)

        }
    }

    return (
        <>
            <div className="bg-white">
                <div className="flex space-x-9 h-auto">
                    <div className="mb-auto max-w-2xl py-16 px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
                        <Filters onApplyClick={()=>onApplyFiltersClick()}
                                 categories={categories} setCategoryId={(id)=>setCategoryId(id)}
                                 priceFrom={priceFrom} setPriceFrom={(price)=>setPriceFrom(price)}
                                 priceTo={priceTo} setPriceTo={(price)=>setPriceTo(price)}
                                 publicationYearTo={publicationYearTo} publicationYearFrom={publicationYearFrom}
                                 setPublicationYearFrom={(year)=>setPublicationYearFrom(year)}
                                 setPublicationYearTo={(year)=>setPublicationYearTo(year)}
                        />
                    </div>
                    <div>
                        {books.length > 0 &&
                            // <SortOptions sortBooks={sortBooks} selectOptions={bookSortOptions} />
                            <SortOptions setSortOptions={(option)=>setSortOption(option)}/>
                        }
                        <div className="mb-auto max-w-2xl py-16 px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
                            { books.length > 0 ?<BooksGrid books={books}/> :
                                <img
                                    className="mx-auto max-w-full h-screen "
                                    src={no_data_illustration}
                                    alt="no data found"
                                />}
                        </div>
                    </div>
                </div>
                <Pagination limitPerPage={limitPerPage}
                            totalBooks={totalBooks}
                            paginate={paginate}
                            currentPage={currentPage}
                            onPreviousPageClick={onPreviousPageClick}
                            onNextPageClick = {onNextPageClick}
                />
            </div>
            {/*<BookDetails/>*/}
        </>

    )
}

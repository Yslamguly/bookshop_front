import {useEffect, useState} from "react";
import {Filters} from "../components/Filters";
import {BooksGrid} from "../components/BooksGrid";
import no_data_illustration from "../assets/no-data-illustration.svg"
import Pagination from "../components/Pagination";
import {SortOptions} from "../components/SortOptions";
import {fetchCategories} from "../api/CategoriesApi"
import {fetchBooks} from "../api/BooksApi";
import {sortBooks} from "../utils/functions";


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
    const [booksCount,setBooksCount] = useState()

    useEffect( ()=>{
        const fetchBooksAndCategories = async () => {
            const allBooks = await fetchBooks(
                currentPage,
                limitPerPage,
                priceFrom,
                priceTo,
                publicationYearFrom,
                publicationYearTo,
            );
            setBooks(sortBooks(sortOption, allBooks.books));

            const allCategories = await fetchCategories();
            setCategories(allCategories);
        };

        fetchBooksAndCategories();
    },[currentPage,sortOption])

    const onApplyFiltersClick = async ()=>{
        const filteredBooks = await fetchBooks(currentPage,
            limitPerPage,
            priceFrom,
            priceTo,
            publicationYearFrom,
            publicationYearTo,
            categoryId);

        setBooks(sortBooks(sortOption,filteredBooks.books))
        setBooksCount(filteredBooks.booksCount)
    }
    const onPreviousPageClick = () =>{
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const onNextPageClick = () =>{
        if(booksCount/limitPerPage === 0){
            return
        }
        if (currentPage !== Math.ceil(booksCount / limitPerPage)) {
            setCurrentPage(currentPage + 1);

        }
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="bg-white">
                <div className="flex md:flex-nowrap  flex-wrap space-x-9 h-auto">
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
                            totalBooks={booksCount}
                            paginate={paginate}
                            currentPage={currentPage}
                            onPreviousPageClick={onPreviousPageClick}
                            onNextPageClick = {onNextPageClick}
                />
            </div>
        </>

    )
}

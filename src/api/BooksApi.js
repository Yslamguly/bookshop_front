import axios from "axios";
import {SERVER_URL} from "../globals";

export const fetchBooks = async (
    currentPage,
    limitPerPage,
    priceFrom,
    priceTo,
    publicationYearFrom,
    publicationYearTo,
    categoryId
) => {
    try {
        const response = await axios.get(
            `${SERVER_URL}/books?page=1&limit=${limitPerPage}&selling_price_from=${priceFrom}&selling_price_to=${priceTo}&publication_year_from=${publicationYearFrom}&publication_year_to=${publicationYearTo}&sort_value=id&category_id=${categoryId}`
        );
        return {
            books: response.data.outcome,
            booksCount: response.data.total_items
        };
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
};

export async function getBooksDescription(book) {
    return await axios.get(`${book.description}`)
        .then((response) => {
                const res = response.data.query.pages
                const pageId = Object.keys(res)[0]
                // console.log(response.data.query.pages[pageId]["extract"])
                return response.data.query.pages[pageId]["extract"]
            }
        ).catch((error) => console.log(error))
}

export const getBookDetails = async (bookId) => {
    return await axios.get(`${SERVER_URL}/books/details?book_id=${bookId}`)
}


export const getBestSellers = async () => {
    return await axios.get(`${SERVER_URL}/books/bestSellers`)
}

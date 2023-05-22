import axios from "axios";
import {SERVER_URL} from "../globals";

export const fetchBooks = async (
    currentPage,
    limitPerPage,
    priceFrom,
    priceTo,
    publicationYearFrom,
    publicationYearTo
) => {
    try {
        const response = await axios.get(
            `${SERVER_URL}/books?page=${currentPage}&limit=${limitPerPage}&selling_price_from=${priceFrom}&selling_price_to=${priceTo}&publication_year_from=${publicationYearFrom}&publication_year_to=${publicationYearTo}&sort_value=id`
        );
        console.log(response.data.outcome)
        return response.data.outcome;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
};

export async function getBooksDescription(book){
    return axios.get(`${book.description}`)
        .then((response)=>{
                const res = response.data.query.pages
                const pageId = Object.keys(res)[0]
                // console.log(response.data.query.pages[pageId]["extract"])
                return response.data.query.pages[pageId]["extract"]
            }
        ).catch((error)=>console.log(error))
}

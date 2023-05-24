import axios from "axios";
import {SERVER_URL} from "../globals";

export const createCheckoutSession = async (books,userId) =>{
    return await axios.post(`${SERVER_URL}/stripe/create-checkout-session`, {
        books: books,
        userId: userId
    })
}

import axios from "axios";

export const createCheckoutSession = async (books,userId) =>{
    return await axios.post('http://localhost:8000/stripe/create-checkout-session', {
        books: books,
        userId: userId
    })
}

import axios from "axios";
import {SERVER_URL} from "../globals";

export const addBookToShoppingCart = async(product,userId,token) => {
    return await axios.post(`${SERVER_URL}/shopping_cart/addBook/${userId}`, {
        book_id: product.id,
        price: product.selling_price
    }, {
        headers: {authorization: `Bearer ${token}`}
    })
}

export const fetchUserShoppingCart = async (userId,token) => {
    return await axios.get(`${SERVER_URL}/shopping_cart/${userId}`,{
        headers: {authorization: `Bearer ${token}`}
    })
}
export const deleteBookFromUserShoppingCart = async (userId,token,bookId) =>{
    return await axios.delete(`${SERVER_URL}/shopping_cart/deleteBook/${userId}`, {
        data: {shopping_cart_item_book_id: bookId},
        headers: {authorization: `Bearer ${token}`}
    })
}

export const updateBookQuantity = async (quantity, bookId, price,userId,token) => {
    return await axios.patch(`${SERVER_URL}/shopping_cart/updateQuantity/${userId}`, {
        book_id: bookId,
        quantity: quantity,
        total_price: quantity * price
    }, {
        headers: {authorization: `Bearer ${token}`}
    })
}

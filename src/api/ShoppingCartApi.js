import axios from "axios";

export const addBookToShoppingCart = async(product,userId,token) => {
    return await axios.post(`http://localhost:8000/shopping_cart/addBook/${userId}`, {
        book_id: product.id,
        price: product.selling_price
    }, {
        headers: {authorization: `Bearer ${token}`}
    })
}

export const fetchUserShoppingCart = async (userId,token) => {
    return await axios.get(`http://localhost:8000/shopping_cart/${userId}`,{
        headers: {authorization: `Bearer ${token}`}
    })
}
export const deleteBookFromUserShoppingCart = async (userId,token,bookId) =>{
    return await axios.delete(`http://localhost:8000/shopping_cart/deleteBook/${userId}`, {
        data: {shopping_cart_item_book_id: bookId},
        headers: {authorization: `Bearer ${token}`}
    })
}

export const updateBookQuantity = async (quantity, bookId, price,userId,token) => {
    return await axios.patch(`http://localhost:8000/shopping_cart/updateQuantity/${userId}`, {
        book_id: bookId,
        quantity: quantity,
        total_price: quantity * price
    }, {
        headers: {authorization: `Bearer ${token}`}
    })
}

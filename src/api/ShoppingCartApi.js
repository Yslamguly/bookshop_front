import axios from "axios";

export function addBookToShoppingCart(product,userId,token) {
    return axios.post(`http://localhost:8000/shopping_cart/addBook/${userId}`, {
        book_id: product.id,
        price: product.selling_price
    }, {
        headers: {authorization: `Bearer ${token}`}
    })
}

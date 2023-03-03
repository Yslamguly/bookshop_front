import axios from "axios";

export function addBookToShoppingCart(product,userId,token) {
    return axios.post(`http://localhost:8000/shopping_cart/addBook/${userId}`, {
        book_id: product.id,
        price: product.selling_price
    }, {
        headers: {authorization: `Bearer ${token}`}
    })
}


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
export async function trimStringsInArray(arr,trimFrom,trimTo){
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
        arr[i] = arr[i].substring(trimFrom, trimTo);
    }
}


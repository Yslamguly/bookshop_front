
export async function trimStringsInArray(arr,trimFrom,trimTo){
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].substring(trimFrom, trimTo);
    }
}
export const sortBooks = (option, booksArray) =>{
     switch (option){
         case
         "Date: new to old": return [...booksArray].sort((a, b) => b.publication_year - a.publication_year)
         case
         "Date: old to new": return [...booksArray].sort((a, b) => a.publication_year - b.publication_year)
         case
         "A-Z": return [...booksArray].sort((a, b) => a.title > b.title ? 1 : -1)
         case
         "Z-A": return [...booksArray].sort((a, b) => a.title > b.title ? -1 : 1)
         case
         "Price: high to low": return [...booksArray].sort((a, b) => b.selling_price - a.selling_price)
         case
         "Price: low to high": return [...booksArray].sort((a, b) => a.selling_price - b.selling_price)
         default:
             return [...booksArray].sort((a, b) => b.id - a.id)

     }
}

export const calculateSubtotal = (books) =>{
    let sum = 0;
    books.map((product) => (
        sum += product.quantity * product.selling_price
    ))
    return sum
}

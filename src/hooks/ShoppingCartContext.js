import React from "react";
import { createContext, useContext, useState } from 'react';

const ShoppingCartContext = createContext({
    showShoppingCart:false,
    setShowShoppingCart: () =>{}
})
export const useShoppingCart = () =>useContext(ShoppingCartContext)

const ShoppingCartProvider = ({children})=>{
    const [showShoppingCart,setShowShoppingCart] = useState(false)
    return(
        <ShoppingCartContext.Provider value={{showShoppingCart,setShowShoppingCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider;

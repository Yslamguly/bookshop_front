import {Routess} from './Routes';
import {useShoppingCart} from "./hooks/ShoppingCartContext";
import {ShoppingCart} from "./pages/ShoppingCart";

export const App = () => {
    const {showShoppingCart,setShowShoppingCart} = useShoppingCart()
    return (
            <div className="page-container">

                {showShoppingCart &&<ShoppingCart showShoppingCart={showShoppingCart} setShowShoppingCart={(bool)=>setShowShoppingCart(bool)}  />}
                <Routess/>
            </div>
    );
}

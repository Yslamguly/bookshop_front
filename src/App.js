import {RoutesController} from './Routes';
import {useShoppingCart} from "./hooks/ShoppingCartContext";
import {ShoppingCart} from "./pages/ShoppingCart";

export const App = () => {
    const {showShoppingCart,setShowShoppingCart} = useShoppingCart()
    return (
            <div className="page-container">
                <ShoppingCart showShoppingCart={showShoppingCart} setShowShoppingCart={(bool)=>setShowShoppingCart(bool)}  />
                <RoutesController/>
            </div>
    );
}

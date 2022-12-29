import {Routess} from './Routes';
import {useShoppingCart} from "./hooks/ShoppingCartContext";
import {ShoppingCart} from "./pages/ShoppingCart";
import {useAuth} from "./hooks/UserContext";

export const App = () => {
    const {showShoppingCart} = useShoppingCart()
    const {userId} = useAuth()
    return (
            <div className="page-container">
                {showShoppingCart && <ShoppingCart userId={userId}/>}
                <Routess/>
            </div>
    );
}

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import {PrivateRoute} from "./hooks/auth/PrivateRoutes";
import SignIn from "./pages/SignIn";
import {ShoppingCart} from "./pages/ShoppingCart";
import {SignUp} from "./pages/SignUp";
import Books from "./pages/Books";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


export const Routess = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/"
                    element={
                        <PrivateRoute>
                            <UserInfoPage />
                        </PrivateRoute>}
                />
                <Route
                    path="/shopping_cart"
                    element={
                        <PrivateRoute>
                            <ShoppingCart />
                        </PrivateRoute>}
                />
                <Route path={"/login"} element={<SignIn/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/books"} element={<Books/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

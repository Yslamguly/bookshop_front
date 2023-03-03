import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import {PrivateRoute} from "./hooks/auth/PrivateRoutes";
import SignIn from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import Books from "./pages/Books";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {PageNotFound} from "./pages/PageNotFound";
import {BookDetails} from "./pages/BookDetails";
import {UnauthorizedPage} from "./pages/401";
import {InternalServerError} from "./pages/500";
import {PaymentSuccess} from "./pages/PaymentSuccess";
import LandingPage from "./pages/LandingPage";
import {BestSellers} from "./pages/BestSellers";


export const Routess = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"/books"} element={<Books/>}/>
                <Route path={"/bestSellers"} element={<BestSellers/>}/>
                <Route path="/user_info"
                    element={
                        <PrivateRoute>
                            <UserInfoPage/>
                        </PrivateRoute>}
                />
                <Route path={"/login"} element={<SignIn/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/checkout-success"} element={<PaymentSuccess/>}/>
                <Route element={<BookDetails />} path="/books/:bookId"/>
                <Route element={<InternalServerError/>} path={"/500"}/>
                <Route path={"/401"} element={<UnauthorizedPage/>}/>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

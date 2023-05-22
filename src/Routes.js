import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {PrivateRoute} from "./hooks/auth/PrivateRoutes";
import SignIn from "./pages/auth/SignIn";
import {SignUp} from "./pages/auth/SignUp";
import Books from "./pages/Books";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {PageNotFound} from "./pages/errors/PageNotFound";
import {BookDetails} from "./pages/BookDetails";
import {UnauthorizedPage} from "./pages/errors/401";
import {InternalServerError} from "./pages/errors/500";
import {PaymentSuccess} from "./pages/stripePayment/PaymentSuccess";
import LandingPage from "./pages/LandingPage";
import {BestSellers} from "./pages/BestSellers";
import {VerifyEmail} from "./pages/emailVerification/VerifyEmail";
import {EmailVerificationLandingPage} from "./components/EmailVerificationLandingPage";
import {ForgotPassword} from "./pages/passwordReset/ForgotPassword";
import {PasswordResetLandingPage} from "./pages/passwordReset/PasswordResetLandingPage";
import UserProfile from "./pages/UserProfile";


export const RoutesController = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"/books"} element={<Books/>}/>
                <Route path={"/bestSellers"} element={<BestSellers/>}/>
                <Route path="/profile"
                    element={
                        <PrivateRoute>
                            <UserProfile/>
                        </PrivateRoute>}
                />
                {/*<Route path={'/profile'} element={<UserProfile/>}/>*/}
                <Route path={"/login"} element={<SignIn/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route element={<EmailVerificationLandingPage/>} path="/verify-email/:verificationString"/>
                <Route path={"/email-verification"} element={<VerifyEmail/>}/>
                <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                <Route path={"/reset-password/:passwordResetCode"} element={<PasswordResetLandingPage/>}/>
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

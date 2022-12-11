import {Route,Redirect,Navigate} from "react-router-dom";
import {useUser} from "./useUser";
import SignIn from "../../pages/SignIn";

// export const PrivateRoute = props => {
//     const user = useUser();
//     if(!user){
//         console.log(user)
//         return <Route path={"/login"} element={<SignIn/>}/>
//
//         // <Redirect to={'/login'}/>
//     }
//     return <Route {...props}/>
// }
export const PrivateRoute = ({  children }) => {
    const user = useUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

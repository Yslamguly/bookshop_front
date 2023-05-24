import axios from "axios";
import {SERVER_URL} from "../globals";

export const resetPassword = async (passwordResetCode, password, confirmPassword) => {
    return await axios.put(`${SERVER_URL}/customers/${passwordResetCode}/reset-password`,
        {newPassword: password, confirmPassword: confirmPassword}
    )
}

export const forgotPassword = async (email) => {
    return await axios.put(`${SERVER_URL}/password/forgot-password/${email}`)
}

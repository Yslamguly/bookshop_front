import axios from "axios";
import {SERVER_URL} from "../globals";

export const login = async (emailValue,passwordValue) => {
    return await axios.post(`${SERVER_URL}/customers/login`, {
        email_address: emailValue,
        password: passwordValue
    })
}
export const register = async (firstName,lastName,emailValue,phoneNumber,passwordValue,confirmPasswordValue) => {
    return await axios.post(`${SERVER_URL}/customers/register`, {
        first_name: firstName,
        last_name: lastName,
        email_address: emailValue,
        phone_number: phoneNumber,
        password: passwordValue,
        confirm_password: confirmPasswordValue
    })
}

export const getGoogleUrl = async () => {
    return await axios.get(`${SERVER_URL}/auth/google/url`)
}

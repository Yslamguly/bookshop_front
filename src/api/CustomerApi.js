import axios from "axios";
import {SERVER_URL} from "../globals";

export const getUserData = async (token,userId) => {
    return  axios.get(`${SERVER_URL}/customers/getCustomerData/${userId}`, {
        headers: {authorization: `Bearer ${token}`}
    })
}

export const updateCustomerData = async (token,userId,first_name,last_name,phoneNumber) => {
    return axios.put(`http://localhost:8000/customers/updateCustomerData/${userId}`, {
        first_name: first_name, last_name: last_name, phone_number: phoneNumber
    }, {
        headers: {authorization: `Bearer ${token}`}
    })
}

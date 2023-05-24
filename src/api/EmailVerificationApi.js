import axios from "axios";
import {SERVER_URL} from "../globals";

export const verifyEmail = async (verificationString) => {
    return await axios.post(`${SERVER_URL}/email-sender/verifyEmail`,
        {verificationString})
}

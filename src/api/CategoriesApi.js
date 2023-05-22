import axios from "axios";
import {SERVER_URL} from "../globals";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
};

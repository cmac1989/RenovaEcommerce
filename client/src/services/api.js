import axios from "axios";

// set up url to match express
const API = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getProducts = () => {
    return API.get("/products");
}
export const addProduct = (product) => {
    return API.post("/cart", product);
}
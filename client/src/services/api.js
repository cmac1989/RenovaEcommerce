import axios from "axios";

// set up url to match express
const API = axios.create({
    baseURL: 'http://localhost:8080',
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');  // Retrieve token from localStorage
        console.log("Intercepting request. Token:", token);
        if (token) {
            console.log('token provided');
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log(config.headers['Authorization'])// Add token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getProducts = () => {
    return API.get("/products");
}
export const addProduct = (product) => {
    return API.post("/cart", product);
}

export const getCartItems = async () => {
    try {

        const token = localStorage.getItem('jwtToken');
        console.log('Token retrieved from localStorage:', token);
        // Assuming the token is stored here
        // console.log(token);
        if (!token) {
            throw new Error("JWT token is missing");
        }
        // console.log((await API.get('http://localhost:8080/cart')).data);
        console.log('Token before request:', token);
        const response = await API.get('http://localhost:8080/cart' //{
            // headers: {
            //     'Authorization': `Bearer ${token}`,
            // },
        //}
        );
        // console.log(response);
        return response.data;  // Return cart data from the server

    } catch (error) {
        console.error('Error fetching cart:', error);
        console.error('Error fetching cart:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error Response:', error.response.data);
            console.error('Error Status:', error.response.status);
            console.error('Error Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error Request:', error.request);
        } else {
            // Something else triggered the error
            console.error('Error Message:', error.message);
        }
        throw error;  // Rethrow the error for the component to handle

        // You can add specific error messages for user feedback, if needed
        throw error;  // Rethrow the error to let the component handle it
    }
};


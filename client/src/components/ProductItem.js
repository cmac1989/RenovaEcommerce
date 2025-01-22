import React, { useEffect, useState } from 'react';
import '../styles/productsPage.css';
import { getProducts, addProduct } from "../services/api";
import Spinner from '../components/Spinner';

function ProductItem() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products when the component mounts
        getProducts()
            .then((response) => {
                setProducts(response.data);  // Store products in state

                // Set a delay so the spinner stays visible for at least 1 second
                setTimeout(() => {
                    setLoading(false);
                }, 200);  // Adjust this value to make the spinner visible longer
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false); // Stop loading if there's an error
            });
    }, []);

    if (loading) {
        return (
            //TODO put styles in external stylesheet
            <div className="product-list" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                <Spinner />
            </div>
        );
    }

    const addToCartHandler = (product) => {
        const productData = {
            user_id: 1,  // Get the logged-in user's ID
            product_id: product.id,
            quantity: 1,  // Default quantity (you can adjust this based on user input)
        };
        console.log('Sending data to backend:', productData);
        addProduct(productData).then(response => {
            console.log('Product added to cart:', response);
        }).catch(error => {
            console.error('Error adding product:', error);
        });
    };

    return (
        <ul className="productList">
            {products.map((product) => (
                <li key={product.id} className="productItem">
                    <img src={`/images/${product.image}`} alt={product.name} />
                    <div className="productName">
                        <h3>{product.name}</h3>
                    </div>
                    <div className="productPrice">
                        CAD ${product.price}
                        <p>{product.description}</p>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => addToCartHandler(product)}>
                        Add to Cart
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ProductItem;

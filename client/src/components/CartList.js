import '../styles/cartPage.css'
import React, { useEffect, useState } from "react";
import { getCartItems } from "../services/api";
import Spinner from "./Spinner";

function CartList() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch cart items when the component mounts
        getCartItems()
            .then((response) => {
                console.log(response);
                setCartItems(response);  // Store items in state

                // Set a delay so the spinner stays visible for at least 1 second
                setTimeout(() => {
                    setLoading(false);
                }, 200);  // Adjust this value to make the spinner visible longer
            })
            .catch((error) => {
                console.error('Error fetching cart:', error);
                setLoading(false); // Stop loading if there's an error
            });
    }, []);

    // Logic for spinner
    if (loading) {
        return (
            //TODO put styles in external stylesheet
            <div className="product-list" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                <Spinner />
            </div>
        );
    }
    // Function to calculate total cost of items in the cart
    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product_price * item.quantity);
        }, 0);
    };

    // Get the total cost
    const totalCost = calculateTotalCost();

    return (
        <div>
        <ul className="productList">
            {cartItems.map((item) => {
                console.log("Rendering item:", item);  // Debugging line to check each item
                return (
                    <li key={item.cart_item_id} className="productItem">
                        <img src={`/images/${item.product_image}`} alt={item.product_name} />
                        <div className="productName">
                            <h3>{item.product_name}</h3>
                        </div>
                        <div className="productPrice">
                            CAD ${item.product_price}
                            <p>{item.product_description}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <button className="add-to-cart-btn">
                            Add to Cart
                        </button>
                    </li>
                );
            })}
        </ul>
            <div className="total-cost">
                <h3>Total Cost Before HST and Shipping: CAD ${totalCost.toFixed(2)}</h3>
            </div>
        </div>
    );
}

export default CartList;

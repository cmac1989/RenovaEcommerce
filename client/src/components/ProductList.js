import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import '../styles/productsPage.css'
import {cartActions} from "../store/cart-slice";
import {useDispatch} from "react-redux";

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products when the component mounts
        getProducts()
            .then((response) => {
                setProducts(response.data);// Store products in state
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Product List</h1>
            <ul className="productList">
                {products.map((product) => (
                    <li key={product.id} className="productItem">
                        <img src={product.image} alt={product.name}/>
                        <div className="productName">
                            <h3>{product.name}</h3>
                        </div>
                        <div className="productPrice">
                            CAD ${product.price}
                            <p>{product.description}</p>
                        </div>

                    </li>
    )
)}
</ul>
</div>
)
    ;
};

export default ProductList;
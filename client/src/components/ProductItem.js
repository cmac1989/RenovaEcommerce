import React, { useState, useEffect } from "react";
import { getProducts, addProduct } from "../services/api";
import { useCart } from "../providers/CartContext";
import Spinner from "../components/Spinner";
import "../styles/productsPage.css";
import ProductModal from "./ProductModal";

function ProductItem() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { updateCartQuantity } = useCart(); // Get the update function from context

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
        setTimeout(() => setLoading(false), 100); // Show spinner for 200ms
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const addToCartHandler = (product) => {
    const productData = {
      //TODO change user_id to something more dynamic
      user_id: 1, // Simulating logged-in user ID
      product_id: product.id,
      quantity: 1,
    };
    addProduct(productData)
      .then(() => {
        // Update the cart quantity both in context and localStorage
        let currentQuantity =
          parseInt(localStorage.getItem("cartQuantity"), 10) || 0;
        const newQuantity = currentQuantity + 1;
        updateCartQuantity(newQuantity); // Update context
        localStorage.setItem("cartQuantity", newQuantity); // Persist in localStorage
        //Set content for modal
        setModalContent({
          title: "Product Added to Cart",
          message: `${product.name} has been successfully added to your cart.`,
          image: `/images/${product.image}`,
        });
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  if (loading) {
    //TODO put styles in external stylesheet
    return (
      <div
        className="product-list"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Spinner />
      </div>
    );
  }
  return (
    <div>
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
            <button
              className="add-to-cart-btn"
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalContent.title}
        message={modalContent.message}
        image={modalContent.image}
      />
    </div>
  );
}

export default ProductItem;

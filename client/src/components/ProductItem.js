import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';
import '../styles/productsPage.css'
import { getProducts } from "../services/api";
import { addProduct } from "../services/api";

function ProductItem(props) {
    const dispatch = useDispatch()

    const { name, price, id, image_url } = props

    // const addToCartHandler = () => {
    //     dispatch(cartActions.addToCart({
    //       id,
    //       name,
    //       price,
    //       image_url,
    //     }))
    //     return (
    //         <productModal />
    //     )
    //   }
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
    // <li className="productItem">
    //   <img src={props.image}></img>
    //   <div className="productName">{props.name}</div>
    //   <div className="productPrice">CAD ${props.price}</div>
    //   <button className="add-to-cart-btn" onClick={addToCartHandler}>
    //     Add to Cart
    //   </button>
    // </li>
      <ul className="productList">
      {products.map((product) => (
              <li key={product.id} className="productItem">
                  <img src={`/images/${product.image}`} alt={product.name}/>

                  <div className="productName">
                      <h3>{product.name}</h3>
                  </div>
                  <div className="productPrice">
                      CAD ${product.price}
                      <p>{product.description}</p>
                  </div>
                      {/*<button className="add-to-cart-btn" onClick={addToCartHandler}>*/}
                      {/*    Add to Cart*/}
                      {/*</button>*/}
                    {/*<button className="addToCart" onClick={addProduct(product)}>*/}
                    {/*    Add to Cart*/}
                    {/*</button>*/}
              </li>
          )
          )}
          </ul>
  )

}

export default ProductItem


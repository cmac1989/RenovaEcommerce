import React from 'react'
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';
import '../styles/products.css'

function ProductItem(props) {
    const dispatch = useDispatch()

    const { name, price, id, image } = props

    const addToCartHandler = () => {
        dispatch(cartActions.addToCart({
          id,
          name,
          price,
          image,
        }))
        return (
            <productModal />
        )
      }

  return (
    <li className="productItem">
      <img src={props.image}></img>
      <div className="productName">{props.name}</div>
      <div className="productPrice">CAD ${props.price}</div>
      <button className="btn" onClick={addToCartHandler}>
        Add to Cart
      </button>
    </li>
  )
}

export default ProductItem


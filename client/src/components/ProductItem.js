import React from 'react'
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';
import classes from '../pages/Products.module.css'

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
    <li className={classes.productItem}>
      <img src={props.image}></img>
      <div className={classes.productName}>{props.name}</div>
      <div className={classes.productPrice}>CAD ${props.price}</div>
      <button className={classes.btn} onClick={addToCartHandler}>
        Add to Cart
      </button>
    </li>
  )
}

export default ProductItem


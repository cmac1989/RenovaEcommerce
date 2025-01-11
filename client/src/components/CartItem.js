import { useDispatch } from 'react-redux';
import classes from '../pages/Cart.module.css';
import { cartActions } from '../store/cart-slice';


function CartItem(props) {
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({
      id: props.item.id,
      name: props.item.name,
      price: props.item.price
    }))
  }

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeFromCart(props.item.id))
  }

  return (
        <div className={classes.productItem}>
          <img src={props.item.image}/>
            <div className={classes.firstRow}>
              <div className={classes.itemName}>{props.item.name}</div>
              <div className={classes.itemAmount}>
                <p>x{props.item.quantity}</p>
                <div className={classes.itemBtns}>
                  <button onClick={removeFromCartHandler}>-</button>
                  <button onClick={addToCartHandler}>+</button>
                </div>
              </div>
            </div>
            <div className={classes.secondRow}>
              <div className={classes.itemPrice}>CAD${props.item.totalPrice.toFixed(2)}</div>
              <div className={classes.pricePerItem}>${props.item.price}/item</div>
            </div>
          </div>
  )
}

export default CartItem
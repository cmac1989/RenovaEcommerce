import { useDispatch } from 'react-redux';
import '../styles/cartPage.css';
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
        <div className="productItem">
          <img src={props.item.image}/>
            <div className="firstRow">
              <div className="itemName">{props.item.name}</div>
              <div className="itemAmount">
                <p>x{props.item.quantity}</p>
                <div className="itemBtns">
                  <button onClick={removeFromCartHandler}>-</button>
                  <button onClick={addToCartHandler}>+</button>
                </div>
              </div>
            </div>
            <div className="secondRow">
              <div className="itemPrice">CAD${props.item.totalPrice.toFixed(2)}</div>
              <div className="pricePerItem">${props.item.price}/item</div>
            </div>
          </div>
  )
}

export default CartItem
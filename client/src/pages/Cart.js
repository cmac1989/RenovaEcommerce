import React from 'react';
import { useSelector } from 'react-redux'
import classes from './Cart.module.css';
import CartList from '../components/CartList';

function Cart() {
  const cartIsEmpty = useSelector(state => state.cart.cartIsEmpty)
  return (
    <div>
        <h1>Your Orders</h1>
    <div className={classes.cart}>
        <div>
          <div>
            {cartIsEmpty && <p>No Items to display</p>}
            {console.log(cartIsEmpty)}
            {!cartIsEmpty && <CartList />}
          </div>
        </div> 
    </div>
    </div>
  )
}

export default Cart
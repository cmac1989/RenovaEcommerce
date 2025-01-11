import { useSelector } from 'react-redux';
import CartItem from './CartItem'
import classes from '../pages/Cart.module.css'

function CartList() {
  const cartItems = useSelector((state) => state.cart.items)

  return (
    <ul className={classes.cart}>
      {cartItems.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={{ 
              id: item.id,
              image: item.image,
              name: item.name,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
              price: item.price
            }}
          />
        )
      })}
    </ul>
  )
}

export default CartList

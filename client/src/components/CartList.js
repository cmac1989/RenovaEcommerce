import { useSelector } from 'react-redux';
import CartItem from './CartItem'
import '../styles/cartPage.css'

function CartList() {
  const cartItems = useSelector((state) => state.cart.items)

  return (
    <ul className="cart">
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

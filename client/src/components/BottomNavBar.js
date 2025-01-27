import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/bottomNavBar.css";
import { CgShoppingCart } from "react-icons/cg";

function BottomNavBar() {
  const cartQuantity = useSelector((state) => state.cart.totalAmount);
  return (
    <div className="bottomNav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/signIn">Sign in</NavLink>
      <NavLink to="/signUp">Sign up</NavLink>
      <NavLink to="/cart">
        {cartQuantity} {<CgShoppingCart />}
      </NavLink>
    </div>
  );
}

export default BottomNavBar;

import { NavLink } from "react-router-dom";

import "../styles/bottomNavBar.css";

function BottomNavBar() {
  return (
    <div className="bottomNav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/signIn">Sign In</NavLink>
      <NavLink to="/signUp">Sign Up</NavLink>
    </div>
  );
}

export default BottomNavBar;

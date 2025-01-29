import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/header.css'
import { CgShoppingCart } from 'react-icons/cg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  const cartQuantity = useSelector(state => state.cart.totalAmount)
  return (
    <div className="header">
        {/* <div className="banner">PLACEHOLDER</div> */}
        <div className="headerContent">
          <div className="headerLogo">LOGO</div>
            <div className="headerNav">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>Products</NavLink>
                <NavLink to='/contact'>Contact</NavLink>
            </div>
            <div className="headerNav2">
                <NavLink>Sign in</NavLink>
                <NavLink to='/cart'> {cartQuantity} {<CgShoppingCart />}</NavLink>
            </div>
        </div>
    </div>
  );
}

export default Header
import { NavLink } from 'react-router-dom';
import { CgShoppingCart } from 'react-icons/cg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from "react";
import { getCartItems } from "../services/api";
import '../styles/header.css';
import {useCart} from "../providers/CartContext";

function Header() {
  const { totalQuantity } = useCart();
  return (
    <div className="header">
      <div className="banner">PLACEHOLDER</div>
      <div className="headerContent">
        <div className="headerNav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="headerLogo">LOGO</div>
        <div className="headerNav2">
          <NavLink to="/signIn">Sign in</NavLink>
          <NavLink to="/signUp">Sign up</NavLink>
          <NavLink to="/cart">
            {totalQuantity} {<CgShoppingCart />}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
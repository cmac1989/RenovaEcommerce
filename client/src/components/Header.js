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
    // const [totalQuantity, setTotalQuantity] = useState(0);

    // useEffect(() => {
    //     getCartItems()
    //         .then((response) => {
    //             console.log('API response:', response); // Log the full response to inspect the data structure
    //
    //             const items = response; // Fallback to empty array if undefined
    //
    //             // If items is an array, calculate total quantity
    //             if (Array.isArray(items)) {
    //                 const total = items.reduce((sum, item) => {
    //                     setTotalQuantity(sum + item.quantity);
    //                     return sum + item.quantity;
    //                 }, 0);
    //                 setTotalQuantity(total);
    //             } else {
    //                 console.error('Expected an array of cart items, but got:', items);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching cart:', error);
    //         });
    // }, []); // Empty dependency array to ensure this only runs on mount
    // useEffect(() => {
    //     const fetchCartItems = async () => {
    //         try {
    //             // const { updateCartQuantity } = useCart();
    //             const response = await getCartItems();
    //             console.log('API response:', response);
    //             const items = response || [];
    //             const total = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    //             updateCartQuantity(total);  // Update the quantity immediately
    //             localStorage.setItem('cartQuantity', total);
    //         } catch (error) {
    //             console.error('Error fetching cart:', error);
    //         }
    //     };
    //
    //     fetchCartItems();  // Fetch cart items on component mount
    // }, []);


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">
                            <NavLink to='/home' className="header-nav-link">Home</NavLink>
                        </Nav.Link>
                        <Nav.Link href="#products">
                            <NavLink to='/products' className="header-nav-link">Products</NavLink>
                        </Nav.Link>
                        <Nav.Link href="#contact">
                            <NavLink to='/contact' className="header-nav-link">Contact</NavLink>
                        </Nav.Link>
                        <Nav.Link href="#cart">
                            <NavLink to='/cart' className="header-nav-link">
                                {totalQuantity} <CgShoppingCart />
                            </NavLink>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
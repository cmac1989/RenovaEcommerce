import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './header.css'
import { CgShoppingCart } from 'react-icons/cg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  const cartQuantity = useSelector(state => state.cart.totalAmount)
  return (
      <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto classes.header">
                      <Nav.Link href="#home"><NavLink to='/home' className="header-nav-link">Home</NavLink></Nav.Link>
                      <Nav.Link href="#products"><NavLink to='/products' className="header-nav-link">Products</NavLink></Nav.Link>
                      <Nav.Link href="#contact"><NavLink to='/contact' className="header-nav-link">Contact</NavLink></Nav.Link>
                      <Nav.Link href="#cart"><NavLink to='/cart' className="header-nav-link"> {cartQuantity} {<CgShoppingCart />}</NavLink></Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    // <div className={classes.header}>
    //     <NavLink to='/home' className={(navData) => navData.isActive ? classes.active : ''}>Home</NavLink>
    //     <NavLink to='/products' className={(navData) => navData.isActive ? classes.active : ''}>Products</NavLink>
    //     <NavLink to='/contact' className={(navData) => navData.isActive ? classes.active : ''}>Contact</NavLink>
    //     <NavLink to='/cart' className={(navData) => navData.isActive ? classes.active : ''}> {cartQuantity} {<CgShoppingCart />}</NavLink>
    // </div>
  );
}

export default Header
import React from "react";
import { Navbar, Nav,  Container } from "react-bootstrap";
import {Link,NavLink} from 'react-router-dom'

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  return (
    
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand href="#home">Admin</Navbar.Brand> */}
          <Link to="/" className="navbar-brand">Admin</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              {/* <Nav.Link href="#deets">Login in</Nav.Link> */}
              <li className="nav-item">
                  <NavLink to="/signin" className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">Sign up</NavLink>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  );
};

export default Header;

import React from "react";
import { Navbar, Nav,  Container } from "react-bootstrap";
import {Link,NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {signOut} from '../../actions/auth.action'

/**
 * @author
 * @function Header
 **/

const Header = (props) => {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  function logout(){
    dispatch(signOut())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style ={{zIndex:1}}>
        <Container fluid>
          {/* <Navbar.Brand href="#home">Admin</Navbar.Brand> */}
          <Link to="/" className="navbar-brand">Admin</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  );
};

export default Header;

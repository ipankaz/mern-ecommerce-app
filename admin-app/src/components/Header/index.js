import React from "react";
import { Navbar, Nav,  Container } from "react-bootstrap";
import {Link,NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {signout} from '../../actions/auth.action'

/**
 * @author
 * @function Header
 **/

const Header = (props) => {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  function logout(){
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span style={{cursor:"pointer"}} className="nav-link" onClick={logout}>
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
        {props.action==="signup" &&
        <li className="nav-item">
        <NavLink to="signin" className="nav-link">
          Signin
        </NavLink>
      </li>
        }
        {props.action==="signin" &&
        <li className="nav-item">
        <NavLink to="signup" className="nav-link">
          Signup
        </NavLink>
      </li>
        }
      </Nav>
    );
  };

  return (
    
      <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style ={{zIndex:1}}>
        <Container fluid>
          {/* <Navbar.Brand href="#home">Admin</Navbar.Brand> */}
          <Link to="/" className="navbar-brand">Admin Dashboard</Link>
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

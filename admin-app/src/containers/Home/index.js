import React from "react";
import {  Container , Row , Col} from "react-bootstrap";
import Layout from "../../components/layout";
import './style.css'
import {NavLink} from 'react-router-dom'

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
            <ul>
            <li><NavLink exact to="/"></NavLink>Home</li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/orders">Orders</NavLink></li>
            </ul>
            </Col>
            <Col md={10} style ={{marginLeft:"auto"}}>Container</Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Home;

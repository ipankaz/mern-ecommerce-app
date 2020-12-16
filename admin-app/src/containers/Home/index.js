import React from "react";
import { Jumbotron, Container , Row , Col} from "react-bootstrap";
import Layout from "../../components/layout";
import './style.css'

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <>
      <Layout>
        {/* <Jumbotron>
          <h1 className="text-center">Welcome to Admin Dashboard</h1>
        </Jumbotron> */}

        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">Side bar</Col>
            <Col md={10} style ={{marginLeft:"auto"}}>Container</Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Home;

import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/layout";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <>
      <Layout>
        <Jumbotron>
          <h1 className="text-center">Welcome to Admin Dashboard</h1>
        </Jumbotron>
      </Layout>
    </>
  );
};

export default Home;

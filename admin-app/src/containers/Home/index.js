import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/MaterialUI/Card";
import Layout from "../../components/layout";
import "./style.css";
import orderImg from "../../Media/ecommerce-shipping-hero.jpg";
import productImg from "../../Media/productpage.png";
import brandImg from "../../Media/Influencer-Marketing-Facebook.jpg";
import categoryImg from "../../Media/categoryHome.jpg";
import { Col, Row } from "react-bootstrap";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const page= useSelector((state) => state.page);

  return (
    <>
      <Layout sidebar>
        <div className={"greeting"}>
          <h4>Hello Mr. {auth.user.lastName}</h4>
        </div>
        <div className="homeCards">
          <Row>
            <Col>
              <Card
                title={"Total Orders"}
                body={order.orders.length}
                image={orderImg}
                url="/orders"
              />
            </Col>
            <Col>
              <Card
                title={"Total Products Added"}
                body={product.products.length}
                image={productImg}
                url="/products"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                title={"Brands Endorsed"}
                body={page.brandPages.length}
                image={brandImg}
                url="/page"
              />
            </Col>
            <Col>
              <Card
                title={"Categories Added"}
                body={category.categories.length}
                image={categoryImg}
                url="/category"
              />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default Home;

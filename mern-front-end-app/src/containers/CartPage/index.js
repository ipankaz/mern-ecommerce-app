import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/index";
import Card from "../../components/UI/Card";

/**
 * @author
 * @function Cart
 **/

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;

  return (
    <>
      <Layout>
        <div className="cartContainer">
          <Card headerleft={"My Cart"} headerright={<div>Deliver to</div>}>
            {Object.keys(cartItems).map((key, index) => 
              <div key={index} className="flexRow">
                 <div className="cartProductContainer">
                  <img src={cartItems[key].img} alt="ProductPicture" />
                 </div>
                 <div className="cartItemDetails">
                   <div>{cartItems[key].name}</div>
                   <div>Delivers in 3-5 Days</div>
                 </div>
              </div>
            )}
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Cart;

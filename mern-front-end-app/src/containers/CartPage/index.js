import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/index";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems } from "../../actions/cart.action";
import { MaterialButton } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import "./style.css";

/**
 * @author
 * @function Cart
 **/

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate, dispatch]);

  const onQuantityIncrement = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <Layout>
        {Object.keys(cart.cartItems).length > 0 ? (
          <div
            className="cartContainer"
            style={{ alignItems: "flex-start", display: "flex" }}
          >
            <Card
              headerleft={"My Cart"}
              headerright={<div>Deliver to</div>}
              style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
            >
              {Object.keys(cartItems).map((key, index) => (
                <CartItem
                  key={index}
                  cartItem={cartItems[key]}
                  onQuantityInc={onQuantityIncrement}
                  onQuantityDec={onQuantityDecrement}
                />
              ))}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  background: "#ffffff",
                  justifyContent: "flex-end",
                  boxShadow: "0 0 10px 10px #eee",
                  padding: "10px 0",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ width: "250px" }}>
                  <MaterialButton
                    title="PLACE ORDER"
                    onClick={() => props.history.push(`/checkout`)}
                  />
                </div>
              </div>
            </Card>
            <PriceDetails
              totalItem={Object.keys(cart.cartItems).reduce(function (
                qty,
                key
              ) {
                return qty + cart.cartItems[key].qty;
              },
              0)}
              totalPrice={Object.keys(cart.cartItems).reduce(
                (totalPrice, key) => {
                  const { price, qty } = cart.cartItems[key];
                  return totalPrice + price * qty;
                },
                0
              )}
            />
          </div>
        ) : (
          <Card
          headerleft={"My Cart"}
          >
<div className="emptyCart">
            <p>Your cart is empty</p>
            <div
              style={{
                width: "250px",
                margin:"0 auto 16px auto"
              }}
            >
              <MaterialButton
                title="Shop Now !"
                onClick={() => props.history.push(`/`)}
                bgColor = "#2874f0"
              />
            </div>
          </div>
          </Card>
          
        )}
      </Layout>
    </>
  );
};

export default Cart;

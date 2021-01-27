import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/index";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import {addToCart , getCartItems} from '../../actions/cart.action'

/**
 * @author
 * @function Cart
 **/

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector(state=>state.auth)
  const [cartItems , setCartItems] = useState(cart.cartItems)

  const dispatch = useDispatch()

  useEffect(()=>{
     setCartItems(cart.cartItems)
  },[cart.cartItems])

  useEffect(()=>{
    if(auth.authenticate){
      dispatch(getCartItems())
    }
  },[auth.authenticate,dispatch])

  const onQuantityIncrement = (_id, qty) => {
    console.log({_id, qty});
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    console.log({_id, qty});
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  return (
    <>
      <Layout>
        <div className="cartContainer" style={{alignItems:"flex-start" , display:"flex"}}>
          <Card headerleft={"My Cart"} headerright={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
          >
            {Object.keys(cartItems).map((key, index) => 
              <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              />
            )}
          </Card>
          <Card
          headerleft={"price"}
          style={{width:"500px"}}
          >
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Cart;

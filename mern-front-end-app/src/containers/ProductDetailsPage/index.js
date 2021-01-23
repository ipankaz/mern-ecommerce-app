import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions/product.action";
import Layout from "../../components/Layout/index";

/**
 * @author
 * @function ProductDetailsPage
 **/
let element = true;

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    if (element) {
      const { productId } = props.match.params;
      const payload = {
        params: { productId },
      };
      console.log(productId);
      dispatch(getProductDetailsById(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    element = false;
  });

  return (
    <>
    <Layout>
    <div>{product.productDetails.name}</div>
    </Layout>
    </>
  )
  
};

export default ProductDetailsPage;

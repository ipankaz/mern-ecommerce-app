import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/product.action";
import { generatePublicUrl } from "../../../urlConfig";
import {Link} from 'react-router-dom'

/**
 * @author
 * @function ProductStore
 **/
let element=true;

const ProductStore = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const priceRange = {
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  };

  useEffect(()=>{
    if(element){
      const { match } = props;
      dispatch(getProductsBySlug(match.params.slug));
    }
    element=false;
  })

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div key={index} className="card">
            <div className="cardHeader">
              <div>
                {props.match.params.slug} Mobiles under {priceRange[key]}
              </div>
              <button>View All</button>
            </div>
            <div className="allProducts">
              {product.productsByPrice[key].map((product,index) => (

                <Link style={{display:"block"}} 
                to={`/${product.slug}/${product._id}/p`}
                className="productContainer"
                key={index}
                >
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div className="productName">{product.name}</div>
                    <div>
                      <span>4.3</span>
                      <span>(999)</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductStore;

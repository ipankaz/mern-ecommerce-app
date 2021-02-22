import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/product.action";
import { generatePublicUrl } from "../../../urlConfig";
import {Link} from 'react-router-dom'
import Card from '../../../components/UI/Card'
import {Button} from 'react-bootstrap'
import Price from '../../../components/UI/Price';

/**
 * @author
 * @function ProductStore
 **/
let element=true;

const ProductStore = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
const priceRange = product.priceRange
  // const priceRange = {
  //   under5k: 5000,
  //   under10k: 10000,
  //   under15k: 15000,
  //   under20k: 20000,
  //   under30k: 30000,
  // };

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
          <Card key={index} className="card"
          headerleft={`${props.match.params.slug} Mobiles under ${priceRange[key]}`}
          headerright={<Button variant="primary" >View All</Button>}
          style={{
            width:"calc(100% - 40px)",
            margin:"20px"
          }} >
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
                    <div className="productPrice">
                      <Price value={product.price}></Price>
                    </div>
                  </div>
                </Link>

              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductStore;

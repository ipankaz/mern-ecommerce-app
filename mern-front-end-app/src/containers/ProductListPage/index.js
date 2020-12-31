import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions/product.action";
import Layout from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector(state=>state.product)

//   useEffect(() => {
//     const { match } = props;
    // dispatch(getProductsBySlug(match.params.slug));
//   });

const priceRange = {
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,

}

  function getProducts(){
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }

  return (
    <Layout>
         <button onClick={getProducts}>Get Products</button>
        {Object.keys(product.productsByPrice).map((key,index)=>{
            return(
                <div className="card">
                <div className="cardHeader">
                  <div>{props.match.params.slug} Mobiles under {priceRange[key]}</div>
                  <button>View All</button>
                </div >
                <div className="allProducts">
                    {product.productsByPrice[key].map(product=>
                        <div className="productContainer">
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
                      </div>)}
                  
                </div>
              </div>
            )
        })}
     
    </Layout>
  );
};

export default ProductListPage;

import React from "react";
import "./style.css";
import Layout from "../../components/Layout";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import ProductProducts from "./ProductProducts";
import getParams from '../../utils/getParams'
import ClothingAndAccessories from './ClothingAndAccessories'

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {

  const renderProducts = ()=>{
    const params = getParams(props.location.search)
    let content = null
    switch(params.type){
      case "store" : 
            content = <ProductStore {...props}/>
      break;
      case "page" : 
            content = <ProductPage {...props}/>
      break;
      case  "product" :
            content = <ProductProducts {...props}/>
      break;
      default : 
            content = <ClothingAndAccessories {...props}/>
    }
    return content
  }
  
  return (
    <Layout>
       {renderProducts()}
     </Layout>
  );
};

export default ProductListPage;

import React from 'react'
import getParams from '../../../utils/getParams'
import {useDispatch , useSelector} from 'react-redux'
import{getProductsPage} from '../../../actions/product.action'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {

  const dispatch = useDispatch()
  const params = getParams(props.location.search)
  const product = useSelector(state=>state.product)
  const {page} = product

  // useEffect(()=>{
  //  const payload ={params}
  //  dispatch(getProductsPage(payload))
  // },[params])

  const dispatchProductPageAction = ()=>{
    const payload ={params}
    dispatch(getProductsPage(payload))
  }

  return(
    <>
    <button onClick={dispatchProductPageAction}>Dispatch Product Page Action</button>
    <h3>{page.title}</h3>
   { page.products && <img src={page.products[0].img}/>}
    <Carousel>
      {page.banners && page.banners.map((banner,index)=>
      <div key={index}>
        <img src={banner.img} alt=""/>
      </div>
      )}
    </Carousel>
    </>
   )

 }

export default ProductPage
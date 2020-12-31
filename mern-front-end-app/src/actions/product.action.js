import axios from "../helpers/axios"
import { productConstants } from "./constants"

export const getProductsBySlug = (slug)=>{
    return async dispatch =>{
        console.log(slug)
        dispatch({type:productConstants.GET_PRODUCT_BY_SLUG_REQUEST})
        const res = await axios.get(`/product/${slug}`)
        console.log(res)
        if(res.status===200){
            dispatch({type:productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload:res.data
         })}
         else{
            dispatch({type:productConstants.GET_PRODUCT_BY_SLUG_FAILURE})
         }
        
        
    }
}
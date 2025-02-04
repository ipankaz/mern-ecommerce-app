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

export const getProductsPage = (payload)=>{
    return async dispatch =>{
        try{
            const {cid,type} = payload.params
            
            dispatch({type:productConstants.GET_PRODUCT_PAGE_REQUEST})
            
            const res = await axios.get(`/page/${cid}/${type}`)
            console.log(res)
            if(res.status===200){
                dispatch({type:productConstants.GET_PRODUCT_PAGE_SUCCESS,
                payload:{page:res.data.page}})
             }
             else{
                dispatch({type:productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload:{page:res.data.error}})
             }
        }catch(error){
           console.log(error)
        }
        
    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/products/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}
import { productConstants } from "../actions/constants"

const initState = {
    products:[],
    productsByPrice : {
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under30k:[]

    },
    pageRequest:false,
    page:{},
    error:null
}

const productReducer = (state=initState , action)=>{
    switch(action.type){
        case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS :
            state = {
                ...state,
                products:action.payload.products,
                productsByPrice:{
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_REQUEST :
            state = {
                ...state,
                pageRequest:true,
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS :
            state = {
                ...state,
                pageRequest:false,
                page:action.payload.page
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_FAILURE :
            state = {
                ...state,
                pageRequest:false,
                error:action.payload.error
            }
            break;
            default : state = {...state}
    }
    return state

}

export default productReducer
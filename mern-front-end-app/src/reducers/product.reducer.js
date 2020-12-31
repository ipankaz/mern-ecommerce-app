import { productConstants } from "../actions/constants"

const initState = {
    products:[],
    productsByPrice : {
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under30k:[]

    }
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
            default : state = {...state}
    }
    return state

}

export default productReducer
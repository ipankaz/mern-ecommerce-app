import { productConstants } from "../actions/constants";

const initialState = {
    products: []
};

const productReducer =  (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
         default : state={...state}
    }
    

    return state;
}

export default productReducer
export const initialCartState =[]

export const cartReducer = (state = initialCartState,action)=>{
switch(action.type){
    case "ADD_TO_CART":return [...state,action.payload]
    default :return initialCartState
}
}
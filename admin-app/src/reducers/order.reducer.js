import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
const orderReducer =  (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      
      break;
      default : state = {...state}
  }

  return state;
};

export default orderReducer
import {authConstants} from '../actions/constants'
const initAuthState = { 
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
}

const authReducer = (state = initAuthState,action)=>{
    console.log(action);
    
    switch(action.type){

        case authConstants.LOGIN_REQUEST : 
          state = {
            ...state,
            authenticating:true
        }
        break
        case authConstants.LOGIN_SUCCESS : 
          state = {
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            authenticate:true,
            authenticating:false
        }
        break
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initAuthState
            }
            break
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break
        default :state={...state}
        

         
    }
    return state
}
export default authReducer;
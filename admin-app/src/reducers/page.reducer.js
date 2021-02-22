import {pageConstants} from '../actions/constants'

const init = {
    error:null,
    loading:false,
    page:{},
    brandPages:[]
}

const pageReducer = (state=init , action)=>{
    switch(action.type){
        case pageConstants.CREATE_PAGE_REQUEST :
            state={
                ...state,
                loading:true,
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS :
            state={
                ...state,
                loading:false,
            }
            break;
        case pageConstants.CREATE_PAGE_FAILURE :
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
            case pageConstants.GET_BRAND_PAGES_SUCCESS:
            state={
                ...state,
                loading:false,
                brandPages:action.payload.brandPages
            }
            break;
            default : state = {...state}
    }
    return state
}

export default pageReducer
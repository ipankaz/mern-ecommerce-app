import { categoryConstants } from '../actions/constants';


const initState = {
    categories:[],
    loading:false,
    error:null
}

const buildNewCategory = (parentId,categories,newCategory)=>{
let myCategories = []

if(parentId===undefined){
    return [
        ...categories,
        {
            _id:newCategory._id,
            name:newCategory.name,
            slug:newCategory.slug,
            children:[]
        }
    ]
}

for(let cat of categories){
    if(cat._id===parentId){
        myCategories.push({
            ...cat,
            children:cat.children  ? buildNewCategory(parentId,[...cat.children,{
               _id:newCategory._id,
                name:newCategory.name,
                slug:newCategory.slug,
                parentId:newCategory.parentId,
                children:newCategory.children,
            }],newCategory) :[]
        })
    }else{
        myCategories.push({
            ...cat,
            children:cat.children  ? buildNewCategory(parentId,cat.children,newCategory) : []
        })
    }
}
return myCategories
}

const categoryReducer =  (state = initState,action)=>{

switch(action.type){
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
        state = {
            ...state,
            loading :true
        }
        break;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
        
        state = {
            ...state,
            categories:action.payload.categories,
            loading :false
        }
        break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category
            const updatedCategories = buildNewCategory(category.parentId,state.categories,category)
            console.log("updated categories" ,updatedCategories)
            state = {
                ...state,
                categories:updatedCategories,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState
            
            }
            break;
        default : state = {...state}
    
}
return state
}

export default categoryReducer
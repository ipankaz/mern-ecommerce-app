import axios from '../helpers/axios'
import { categoryConstants } from './constants';

 const getAllCategories = ()=>{
    return async dispatch =>{
        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST})
        const res = await axios.get('/category/getcategories')
        console.log(res);
        if(res.status===200){
            const {categoryList} = res.data
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{
                    categories : categoryList
                }
            })
        }else{
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post(`/category/create`, form);
        if(res.status === 201){
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload:{ category: res.data.category} 
            });
        }else{
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: {error:res.data.error}
            });
        }
    }
}
export const updateCategory = (form) => {
    return async dispatch => {
        dispatch({type:categoryConstants.UPDATE_CATEGORIES_REQUEST})
        const res = await axios.post(`/category/update`, form);
        if(res.status === 201){
            dispatch({type:categoryConstants.UPDATE_CATEGORIES_SUCCESS})
            dispatch(getAllCategories())
        }else{
            dispatch({
                type:categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
        }
    }
}
export const deleteCategoryAction = (idsArray) => {
    return async dispatch => {
        dispatch({type:categoryConstants.DELETE_CATEGORIES_REQUEST})
        const res = await axios.post(`/category/delete`, {
            payload:{
                idsArray
            }});
            if(res.status===200){
                dispatch({type:categoryConstants.DELETE_CATEGORIES_SUCCESS})
                dispatch(getAllCategories())
                
            }else{
                dispatch({type:categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload:{
                   error:res.data.error
                }})}
        
    }
}

export {getAllCategories}
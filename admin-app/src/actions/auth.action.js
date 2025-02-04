 import  {authConstants} from './constants'
 import axios from '../helpers/axios'

 const authAction = (user)=>{
     
     return async (dispatch)=>{
         dispatch({
             type:authConstants.LOGIN_REQUEST
         })
         const res = await axios.post('admin/signin',{
            ...user
         })
         if(res.status ===200){
             const {token,user}=res.data
             console.log(user);
             localStorage.setItem('token',token)
             localStorage.setItem('user',JSON.stringify(user))
             dispatch({
                 type:authConstants.LOGIN_SUCCESS,
                 payload:{
                  user:user,token
                 }
             })
         }else{
             if(res.status===400){
                 dispatch({
                     type:authConstants.LOGIN_FAILURE,
                     payload:{
                         error:res.data.error
                     }
                 })
             }
         }


     }

}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST });
        console.log(axios);

        const res = await axios.post(`/admin/signout`);

        if(res.status === 200){
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }

        
    }
}
export default authAction

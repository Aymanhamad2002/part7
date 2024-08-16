import { createSlice } from "@reduxjs/toolkit";
import login from "../services/login";
import blogs from "../services/blogs";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers:{
        setUser(state,action) {
            return action.payload
        },
        removeUser(state,action){
            return null
        }

    }
})
export const {setUser,removeUser} = userSlice.actions
export default userSlice.reducer

export const setLoginUser = (credentials) =>{
    return async dispatch => {
        const user =  await login.login(credentials)
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogs.setToken(user.token);
      dispatch(setUser(user))






    }
}
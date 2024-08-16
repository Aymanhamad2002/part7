import { createSlice } from "@reduxjs/toolkit";
import { initializeBlogs } from "./blogReducer";
import user from "../services/user";

const usersSlice = createSlice({
    name:'users',
    initialState:[],
    reducers:{
        setUsers(state,action){
            return action.payload
        }
    }
})
export default usersSlice.reducer
export const  {setUsers}  = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        const users = await user.getAll()
        dispatch(setUsers(users))
    }

}
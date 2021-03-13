import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from "axios"



//REGISTER 
export const sendRegisterRequest = createAsyncThunk('USER_REGISTER_REQUEST', (newUser, thunkAPI)=>{
    return axios 
    .post("http://localhost:5000/api/user/register", newUser)
    .then(({ data: {user} }) => {
        const {token, id, email, firstName, admin, cart_items} = user
        const userData = {token, id, email, firstName, admin, cart_items}

        localStorage.setItem("user", JSON.stringify(userData));

        return userData
    })
})

// LOGIN
export const sendLoginRequest = createAsyncThunk('USER_LOGIN_REQUEST', (loggedUser, thunkAPI)=>{
    return axios 
    .post("http://localhost:5000/api/user/login", loggedUser)
    .then(({ data: {user} }) => {
        const {token, id, email, firstName, admin, cart_items} = user
        const userData = {token, id, email, firstName, admin, cart_items}
        
        
        localStorage.setItem("user", JSON.stringify(userData));

        return userData
    })
})

//LOGOUT
export const userLogout = createAction("USER_LOGOUT")

//USER PERSIST
const user = JSON.parse(localStorage.getItem("user")) || {}

//REDUCER
const userReducer = createReducer(user , {
    [sendRegisterRequest.fulfilled]: (state, action) => action.payload,
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [userLogout] : (state, action) => {}
})

export default userReducer
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from "axios"

//REGISTER 
export const setNewUser = createAsyncThunk('SET_USER', (newUser, thunkAPI)=>{
    return axios 
    .post("http://localhost:5000/api/user/register", newUser)
    .then(({ data }) => {
        const token = data.token
        const userCart = data.cart
        const user = data.user
        
        const session = {user, userCart, token}

        localStorage.setItem("cart", JSON.stringify(userCart.cart_items))  
        localStorage.setItem("session", JSON.stringify(session));

        return {token, userCart, user}
    })
})

// LOGIN
export const setLoggedUser = createAsyncThunk('SET_USER', (loggedUser, thunkAPI)=>{
    return axios 
    .post("http://localhost:5000/api/user/login", loggedUser)
    .then(({ data }) => {
        
        const token = data.token
        const userCart = data.cart
        const user = data.user
        
        const session = {user, userCart, token}
        
        localStorage.setItem("cart", JSON.stringify(userCart.cart_items))  
        localStorage.setItem("session", JSON.stringify(session));

        return {token, userCart, user}
    })
})

const user = JSON.parse(localStorage.getItem("session")) || {}

export const cleanUser = createAction("CLEAN_USER")

const userReducer = createReducer(user , {
    [setLoggedUser.fulfilled]: function (state, action) {
        return action.payload
    },
    [cleanUser] : function (state, action) {
        return {}
    }
})

export default userReducer
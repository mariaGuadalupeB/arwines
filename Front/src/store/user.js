import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from "axios"
// aca van a ir las acciones de user

//register
export const setNewUser = createAsyncThunk('SET_USER', (newUser, thunkAPI)=>{
    return axios 
    .post("http://localhost:5000/api/user/register", newUser)
    .then(res => res.data)
    .then(data => {
       const token = data.token
       const userCart = data.cart
       localStorage.setItem("token", JSON.stringify(token));
       localStorage.setItem("userCart", JSON.stringify(userCart));
    })
})

// login
export const setLoggedUser = createAsyncThunk('SET_USER', (loggedUser, thunkAPI)=>{
    return axios 
    .get("http://localhost:5000/api/user/login", loggedUser)
    .then(res => res.data)
    .then(data => {
        const token = data.token
        const userCart = data.cart
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userCart", JSON.stringify(userCart));
    })
})


// no lo necesito para el register, solo para el login
const userReducer = createReducer([], {
    [setLoggedUser.fulfilled]: function (state, action) {
        return action.payload
    }
})

export default userReducer
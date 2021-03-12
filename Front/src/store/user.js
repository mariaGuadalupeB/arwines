import { jssPreset } from '@material-ui/styles'
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from "axios"
// aca van a ir las acciones de user

//register
export const setNewUser = createAsyncThunk('SET_USER', (newUser, thunkAPI)=>{
    return axios 
    .post("http://localhost:5000/api/user/register", newUser)
    .then(({ data }) => {
        const token = data.token
        const userCart = data.cart
        const user = data.user
        
        const session = {user, userCart, token}

        localStorage.setItem("session", JSON.stringify(session));

        return {token, userCart, user}
    })
})

// login
export const setLoggedUser = createAsyncThunk('SET_USER', (loggedUser, thunkAPI)=>{
    return axios 
    .post("http://localhost:5000/api/user/login", loggedUser)
    .then(({ data }) => {
        
        const token = data.token
        const userCart = data.cart
        const user = data.user
        
        const session = {user, userCart, token}

        localStorage.setItem("session", JSON.stringify(session));

        return {token, userCart, user}
    })
})

const user = JSON.parse(localStorage.getItem("session")) || {}

export const cleanUser = createAction("CLEAN_USER")

// no lo necesito para el register, solo para el login
const userReducer = createReducer(user , {
    [setLoggedUser.fulfilled]: function (state, action) {
        return action.payload
    },
    [cleanUser] : function (state, action) {
        return {}
    }
})

export default userReducer
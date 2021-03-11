import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'


// traer los productos que el usuario cargo en el carrito y cargarlas en el estado
// guardar el carrito en el back -- LOGOUT
// export const saveCart = createAsyncThunk('SAVE_CART', (saveCart, thunkAPI)=>{
//     let token = localStorage.getItem("token")
//     return axios 
//     .post("http://localhost:5000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` }, saveCart
//       })
//     .then(res => res.data)
// })

//buscar productos del carrito
export const findProducts = createAsyncThunk('FIND_PRODUCTS', (id, thunkAPI)=>{
    return axios
    .get(`http://localhost:5000/api/product/${id}`)
    .then(res => res.data)
    .then(data => setCart([...setCart, data]))
})

export const setCart = createAction("SET_CART")

const cartReducer = createReducer([], {
    // [saveCart.fulfilled]: function (state, action) {
    //     return action.payload
    // }
    [setCart]: function(state, action){
        return action.payload
    }
})

export default cartReducer
import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"




  export const fetchCartItemsData = createAsyncThunk('FETCH_CART_ITEMS_DATA', (cart_items, thunkAPI)=>{

    const PromisesProducts = cart_items.map((cartItem) => {
        const id = cartItem.productId
        return axios.get(`http://localhost:5000/api/product/${id}`)
        .then(({ data }) => {
          data.quantity = cartItem.quantity
          return data
        })
      })
      
    return Promise.all(PromisesProducts).then(cartItems => cartItems)
    })


    //------

export const saveCartItems = createAction("SAVE_CART_ITEMS")

function userLocalCartItems() {
    const userInLocalStorage = JSON.parse(localStorage.getItem("users"))
    return userInLocalStorage && userInLocalStorage.cart_items 
}

const cart_items = userLocalCartItems() || []

localStorage.setItem('cart_items', JSON.stringify(cart_items))


const cartItemsReducer = createReducer(cart_items, {
    [saveCartItems]: (state, action) => [ ...state , action.payload ],
    [fetchCartItemsData]: (state, action) => action.payload 
})



export default cartItemsReducer

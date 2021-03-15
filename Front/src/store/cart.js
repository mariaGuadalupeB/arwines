import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"



export const resetCart_items = createAction("RESET_CART_ITEMS")

export const saveCartItems = createAction("SAVE_CART_ITEMS")

const cart_items = JSON.parse(localStorage.getItem("cart_items")) || []

localStorage.setItem('cart_items', JSON.stringify(cart_items))

const cartItemsReducer = createReducer(cart_items, {
    [saveCartItems]: (state, action) => action.payload,
    [resetCart_items]: (state, action) => ([]),
    
    // [saveCartItems]: (state, action) => [ ...state , action.payload ],
    // [fetchCartItemsData]: (state, action) => action.payload 
})

export default cartItemsReducer

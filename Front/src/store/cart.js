import { createAction, createReducer } from '@reduxjs/toolkit'


export const saveCart = createAction("SAVE_CART")

const cart = JSON.parse(localStorage.getItem("cart")) || []

const cartReducer = createReducer(cart, {
    [saveCart]: (state, action) => [ ...state , action.payload ]
})



export default cartReducer


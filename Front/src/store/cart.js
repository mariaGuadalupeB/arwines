import { createAction, createReducer } from '@reduxjs/toolkit'


export const saveCartItems = createAction("SAVE_CART_ITEMS")

function userLocalCartItems() {
    const userInLocalStorage = JSON.parse(localStorage.getItem("users"))
    return userInLocalStorage && userInLocalStorage.cart_items 
}

const cart_items = userLocalCartItems() || []

const cartItemsReducer = createReducer(cart_items, {
    [saveCartItems]: (state, action) => [ ...state , action.payload ]
})



export default cartItemsReducer

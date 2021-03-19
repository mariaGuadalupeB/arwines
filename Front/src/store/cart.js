import { createAction, createReducer } from '@reduxjs/toolkit';


export const resetCart_items = createAction("RESET_CART_ITEMS")

export const saveCartItems = createAction("SAVE_CART_ITEMS")

// export const sendLoginRequest = createAsyncThunk('USER_LOGIN_REQUEST', (loggedUser, thunkAPI)=>{
//     return axios 
//     .post("http://localhost:5000/api/user/login", loggedUser)
//     .then(({ data: {user} }) => {
//         const {token, id, email, firstName, admin, cart_items} = user
//         const userData = {token, id, email, firstName, admin, cart_items}
//         console.log(cart_items,123123123123)
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("cart_items", JSON.stringify(cart_items));
        
//         return userData
//     })
// })

const cart_items = JSON.parse(localStorage.getItem("cart_items")) || []

localStorage.setItem('cart_items', JSON.stringify(cart_items))

const cartItemsReducer = createReducer(cart_items, {
    [saveCartItems]: (state, action) => action.payload,
    [resetCart_items]: (state, action) => {
        localStorage.setItem('cart_items', JSON.stringify([]))
        return []}
})

export default cartItemsReducer

import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import userReducer from './user'
import cartReducer from './cart'

import wineReducer from "./wine"
import winesReducer from "./wines"

import setProductsArrReducer from "./productsArr"

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: { 
        user: userReducer, 
        cart: cartReducer,
        selectedWine: wineReducer,
        wines: winesReducer,
        productos: setProductsArrReducer,
    }
})

export default store
import { createAction, createReducer } from '@reduxjs/toolkit'


export const productsArr = createAction("PRODUCTS_CART")

const setProductsArrReducer = createReducer([], {
    [productsArr]: (state, action) => [ ...state , action.payload ]
})



export default setProductsArrReducer



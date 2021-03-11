import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const setWine = createAsyncThunk('SET_WINE', id => {
    return axios.get(`http://localhost:5000/api/product/${id}`)
        .then(r => r.data);
});

const wineReducer = createReducer({}, {
    [setWine.fulfilled]: (state, action) => action.payload
})

export default wineReducer
import axios from 'axios';
import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
// aca van a ir las acciones de user
// un usuario loggeado
const baseUrl = 'http://localhost:5000/api'

export const setWines = createAsyncThunk('SET_WINES', () => {
  return axios.get(`${baseUrl}/product`)
    .then(r => r.data)
})

export const queryWines = createAsyncThunk('QUERY_WINES', string => {
  return axios.get(`${baseUrl}/product?name=${string}`)
    .then(r => r.data);
});

const winesReducer = createReducer({}, {
  [setWines.fulfilled]: (state, action) => ({...state, wines: action.payload}),
  [queryWines.fulfilled]: (state, action) => ({...state, queryWines: action.payload})
});

export default winesReducer;

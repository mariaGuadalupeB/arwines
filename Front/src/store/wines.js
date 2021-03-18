import axios from 'axios';
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = 'http://localhost:5000/api'

export const setWines = createAsyncThunk('SET_WINES', () => {
  return axios.get(`${baseUrl}/product`)
    .then(res => res.data)
})

export const queryWines = createAsyncThunk('QUERY_WINES', string => {
  console.log(string)
  return axios.get(`${baseUrl}/search?name=${string}`).then(res => res.data).catch(err => err);
});

const winesReducer = createReducer({}, {
  [setWines.fulfilled]: (state, action) => ({...state, wines: action.payload}),
  [queryWines.fulfilled]: (state, action) => ({...state, wines: action.payload})
});

export default winesReducer;

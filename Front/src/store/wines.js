import axios from 'axios';
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = 'http://localhost:5000/api'

export const setWines = createAsyncThunk('SET_WINES', () => {
  return axios.get(`${baseUrl}/product`)
    .then(res => res.data)
})

export const queryWines = createAsyncThunk('QUERY_WINES', string => {
  const categoryPromise = axios.get(`${baseUrl}/category/${string}/products`).then(res => res.data).catch(err => err)
  //catcherar esto para no caiga elp primise ;
  const productPromise = axios.get(`${baseUrl}/product?name=${string}`).then(res => res.data).catch(err => err);
  
  return Promise.any([categoryPromise, productPromise])
  //.catch( para recibier el errror )
  // finally

  

  
});

const winesReducer = createReducer({}, {
  [setWines.fulfilled]: (state, action) => ({...state, wines: action.payload}),
  [queryWines.fulfilled]: (state, action) => ({...state, wines: action.payload})
});

export default winesReducer;

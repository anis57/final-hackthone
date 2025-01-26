import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    product: [],
}

const Reducers = createSlice({
    name: 'Product',
    initialState,
    reducers:{
        GetAllData: (state, {payload})=>{
            return state.product = payload
        },
        AddData: (state, {payload})=>{
            const existingProduct = state.product.find((item)=>item._id === payload._id);

            if(existingProduct.quantity > 1){
                existingProduct.quantity += 1;
            }else{
                return state.product.push(payload);
            }
        },
        DeleteData: (state, {payload})=>{
            const existingProduct = state.product.find((item)=>item._id === payload._id);

            if(existingProduct.quantity > 1){
                existingProduct.quantity -= 1;
            }else{
                return state.product =  state.product.filter((item)=>item._id !== payload._id);
            }
        },
        UpdateData: (state, {payload})=>{
            const Index = state.product.findIndex((item)=>item._id === payload._id);
            return state.product[Index] = payload.data;
        },
    }
})
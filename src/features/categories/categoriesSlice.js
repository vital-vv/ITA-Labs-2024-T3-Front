import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from '../../utils/constants.js';
import axios from 'axios';

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => { // eslint-disable-line no-unused-vars
        try {
            const res = await axios(`${BASE_URL}/categories`);
            return res.data;
        } catch (err){
            return thunkAPI.rejectWithValue(err);
        }
    })

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false,
        // currentCategory : null,
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.list =  action.payload;
            state.isLoading = false;
        });
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading =  true;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading =  false;
        });
    }
})

export default categoriesSlice.reducer;
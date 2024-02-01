import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from '../../utils/constants.js';
import axios from 'axios';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, thunkAPI) => { // eslint-disable-line
        try {
            const res = await axios(`${BASE_URL}/users`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUsers.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default usersSlice.reducer;
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../../utils/axios.js";

const limitOfUsers = 5;

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (page, thunkAPI) => {
        try {
            const res = await api.get(`/users?page=${page}&limit=${limitOfUsers}`);
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
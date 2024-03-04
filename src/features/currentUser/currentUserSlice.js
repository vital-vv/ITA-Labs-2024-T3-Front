import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from '../../utils/constants.js';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
    'currentUser/fetchUserData', async (idToken, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/idtoken`, {
                headers: {
                    Authorization: idToken,
                },
            });

            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    });

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        userData: null,
        idToken: null,
        accessToken: null,
        status: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setTokens: (state, action) => {
            state.idToken = action.payload.idToken;
            state.accessToken = action.payload.accessToken;
        },
        clearUserData: state => {
            state.userData = null;
            state.idToken = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserData.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})
export const {setTokens, clearUserData} = currentUserSlice.actions;

export const selectUserData = state => state.user.userData;
export default currentUserSlice.reducer;
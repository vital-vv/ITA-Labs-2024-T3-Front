import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../utils/axios.js";

export const getImages = createAsyncThunk(
    'images/getImages',
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/images/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    })

const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        listOfImages: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getImages.fulfilled, (state, action) => {
                state.listOfImages = [...state.listOfImages, action.payload.url];
                state.isLoading = false;
            })
            .addCase(getImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getImages.rejected, (state) => {
                state.isLoading = false;
            });
    }
})

export default imagesSlice.reducer;
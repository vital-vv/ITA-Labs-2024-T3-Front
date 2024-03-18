import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../../utils/axios.js";

export const getSubcategories = createAsyncThunk(
    'categories/getSubcategories',
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/categories/${id}`);
            return res.data;
        } catch (err){
            return thunkAPI.rejectWithValue(err);
        }
    })

const subcategoriesSlice = createSlice({
    name: 'subcategories',
    initialState: {
        list: [],
        isLoading: false,
    },
    reducers: {
        deleteSubcategories(state) {
            state.list = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSubcategories.fulfilled, (state, action) => {
            state.list =  action.payload;
            state.isLoading = false;
        });
        builder.addCase(getSubcategories.pending, (state) => {
            state.isLoading =  true;
        });
        builder.addCase(getSubcategories.rejected, (state) => {
            state.isLoading =  false;

        });
    }
})

export const {deleteSubcategories} = subcategoriesSlice.actions;

export default subcategoriesSlice.reducer;
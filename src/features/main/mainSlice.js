import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMainData = createAsyncThunk(
  'main/fetchMainData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api/data-selection'
      );
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    packaging: null,
    currency: null,
    mainDataStatus: 'idle',
    error: null,
    countries: [{ id: 1, name: 'Belarus', regions: ['The Grodno region', 'The Minsk region', 'The Brest region', 'The Gomel region', 'The Vitebsk region', 'The Mogilev region'] }],
    quantity: null,
    apples: [
      { name: 'alwa', id: 1, isChecked: false },
      { name: 'antonowka', id: 2, isChecked: false },
      { name: 'boiken', id: 3, isChecked: false },
      { name: 'boskoop', id: 4, isChecked: false },
      { name: 'braeburn', id: 5, isChecked: false },
      { name: 'champion', id: 6, isChecked: false },
    ],
    sizing: [{ name: 'mm' }, {name: 'cm' }],
    isLoadingMain: false,
    isDataReady: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainData.pending, (state) => {
        state.isLoadingMain = true;
        state.isDataReady = false;
      })
      .addCase(fetchMainData.fulfilled, (state, action) => {
        state.packaging = action.payload.packaging;
        state.packaging = state.packaging.map((item, index) => {
          return { name: item, isChecked: false, id: index+50, categoryName: 'packaging' };
        });
        state.currency = action.payload.currency;
        state.quantity = action.payload.weight;
        state.isLoadingMain = false;
        state.isDataReady = true;
      })
      .addCase(fetchMainData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoadingMain = false;
      });
  },
});

export default mainSlice.reducer;

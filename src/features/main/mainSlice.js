import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.js';

export const fetchMainData = createAsyncThunk(
  'main/fetchMainData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/data-selection');
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRegionsCurrentCountry = createAsyncThunk(
  'main/fetchRegionsCurrentCountry',
  async (currentCountry, { rejectWithValue }) => {
    try {
      const response = await api.get(`/data-selection/${currentCountry}/cities`);
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
    // regions: null,
    countries: null,
    // countries: [{ id: 1, name: 'Belarus', regions: ['The Grodno region', 'The Minsk region', 'The Brest region', 'The Gomel region', 'The Vitebsk region', 'The Mogilev region'] }],
    quantity: null,
    apples: [
      { name: 'alwa', id: 1, isChecked: false },
      { name: 'antonowka', id: 2, isChecked: false },
      { name: 'boiken', id: 3, isChecked: false },
      { name: 'boskoop', id: 4, isChecked: false },
      { name: 'braeburn', id: 5, isChecked: false },
      { name: 'champion', id: 6, isChecked: false },
    ],
    sizing: [{ name: 'mm' }, { name: 'cm' }],
    isLoadingMain: false,
    isDataReady: false,
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
          return {
            name: item,
            isChecked: false,
            id: index + 50,
            categoryName: 'packaging',
          };
        });
        state.countries = action.payload.countries;
        state.countries = state.countries.map((country, index) => {
          return { name: country, id: index };
        });
        state.currency = action.payload.currency;
        state.quantity = action.payload.weight;
        state.isLoadingMain = false;
        state.isDataReady = true;
      })
      .addCase(fetchMainData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoadingMain = false;
      })
      .addCase(getRegionsCurrentCountry.fulfilled, (state, action) => {
        state.regions = action.payload;
        state.regions = action.payload.map((region => {
          return {name: region};
        }))
      });
  },
});

export default mainSlice.reducer;

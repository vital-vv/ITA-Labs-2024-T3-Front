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
    countries: null,
    quantity: null,
    sizing: null,
    regions: null,
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
        state.sizing = action.payload.lengthUnits;
        state.sizing = state.sizing.map(size => {
          return { name: size };
        })
      })
      .addCase(fetchMainData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoadingMain = false;
      })
      .addCase(getRegionsCurrentCountry.fulfilled, (state, action) => {
        state.regions = action.payload;
      });
  },
});

export default mainSlice.reducer;

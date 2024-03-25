import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.js';

export const fetchUserData = createAsyncThunk(
  'currentUser/fetchUserData',
  async (idToken, thunkAPI) => {
    try {
      const response = await api.get(`/users/me`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loadUserAllBets = createAsyncThunk(
    'filters/loadUserAllBets',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(
          `/users/bids`
        );
        if (response.status !== 200) {
          throw new Error('Something went wrong');
        }
        console.log(response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    userData: { role: 'admin' },
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
    clearUserData: (state) => {
      state.userData = null;
      state.idToken = null;
      state.accessToken = null;
      state.status = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.status = action.payload.response.status;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = action.payload.response.status;
      });
  },
});
export const { setTokens, clearUserData } = currentUserSlice.actions;

export const selectUserData = (state) => state.currentUser;
export default currentUserSlice.reducer;

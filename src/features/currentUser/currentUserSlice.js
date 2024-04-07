import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.js';
import { accordionActionsClasses } from '@mui/material';

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

export const postOnboarding = createAsyncThunk(
  'onboarding/postOnboarding',
  async (formData, thunkAPI) => {
    try {
      const res = await api.post(`/users`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getAvatar = createAsyncThunk(
  'currentUser/getAvatar',
  async (_, { rejectWithValue, getState }) => {
    const { avatarId } = getState().currentUser.userData;
    try {
      const response = await api.get(`/images/${avatarId}`);
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      return response.data.url;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeCurrentUser = createAsyncThunk(
  'currentUser/changeCurrentUser',
  async (newAvatar, { rejectWithValue, getState }) => {
    const { userData, copyUserData, isChangeAvatar } = getState().currentUser;
    if (
      userData.first_name === copyUserData.first_name &&
      userData.last_name === copyUserData.last_name &&
      userData.preferred_currency === copyUserData.preferred_currency &&
      userData.number === copyUserData.number &&
      userData.phoneCode === copyUserData.phoneCode &&
      userData.urlAvatar === copyUserData.urlAvatar &&
      userData.email === copyUserData.email
    ) {
      return;
    }
    const formData = new FormData();
    const data = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      preferred_currency: userData.preferred_currency,
      phoneNumber: userData.phoneCode + userData.number,
    };
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    formData.append(
      'isChange',
      isChangeAvatar
    );
    if (newAvatar && isChangeAvatar) {
      formData.append('newAvatar', newAvatar);
    }
    try {
      const response = await api.put(`/users`, formData);
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const checkForm = (state) => {
  const phoneNumber = /^\d{9}$/;
  state.isValidNewData = false;
  if (
    (state.userData.first_name &&
      state.userData.last_name &&
      phoneNumber.test(Number(state.userData.number))) 
  ) {
    state.isValidNewData = true;
  }
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    userData: 'GUEST',
    idToken: null,
    accessToken: null,
    status: null,
    isLoading: false,
    error: null,
    currentTab: 'Active',
    userReady: false,
    isValidNewData: false,
    copyUserData: {},
    showModalSuccess: false,
    isChangeAvatar: false,
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
    setActiveTab: (state, action) => {
      state.currentTab = action.payload;
    },
    changeFirstNameField: (state, action) => {
      state.userData.first_name = action.payload;
      checkForm(state);
    },
    changeLastNameField: (state, action) => {
      state.userData.last_name = action.payload;
      checkForm(state);
    },
    changePhoneNumber: (state, action) => {
      state.userData.number = action.payload;
      checkForm(state);
    },
    chooseCountryCode: (state, action) => {
      state.userData.phoneCode = action.payload;
      checkForm(state);
    },
    chooseCurrency: (state, action) => {
      state.userData.preferred_currency = action.payload;
      checkForm(state);
    },
    changeAvatar: (state, action) => {
      state.userData.urlAvatar = action.payload;
      state.isChangeAvatar = true;
      state.isValidNewData = true;
      checkForm(state);
    },
    deleteAvatar: (state) => {
      state.userData.urlAvatar = null;
      state.isChangeAvatar = true;
      state.isValidNewData = true;
      checkForm(state);
    },
    cancelAllChanges: (state) => {
      state.userData.first_name = state.copyUserData.first_name;
      state.userData.last_name = state.copyUserData.last_name;
      state.userData.number = state.copyUserData.number;
      state.userData.phoneCode = state.copyUserData.phoneCode;
      state.userData.preferred_currency = state.copyUserData.preferred_currency;
      state.userData.urlAvatar = state.copyUserData.urlAvatar;
      state.userData.email = state.copyUserData.email;
    },
    changeShowModalAfterTime: (state) => {
      state.showModalSuccess = !state.showModalSuccess;
    },
    changeEmail: (state, action) => {
      state.userData.email = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.userReady = false;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.status = 200;
        state.userReady = true;
        state.userData.number = state.userData.phoneNumber.slice(
          state.userData.phoneNumber.length - 9
        );
        state.userData.phoneCode = state.userData.phoneNumber.slice(
          0,
          state.userData.phoneNumber.length - 9
        );
        state.copyUserData = state.userData;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = action.payload.response.status;
      })

      .addCase(postOnboarding.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOnboarding.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.status = null;
      })
      .addCase(postOnboarding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = null;
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.urlAvatar = action.payload;
        state.status = null;
        state.copyUserData = {
          ...state.copyUserData,
          urlAvatar: action.payload,
        };
        state.isChangeAvatar = false;
      })
      .addCase(changeCurrentUser.fulfilled, (state) => {
        state.showModalSuccess = true;
      });
  },
});
export const {
  setTokens,
  clearUserData,
  setActiveTab,
  changeFirstNameField,
  changeLastNameField,
  changePhoneNumber,
  chooseCountryCode,
  separatePhone,
  chooseCurrency,
  changeAvatar,
  deleteAvatar,
  cancelAllChanges,
  changeShowModalAfterTime,
  changeEmail,
} = currentUserSlice.actions;

export const selectUserData = (state) => state.currentUser;
export default currentUserSlice.reducer;

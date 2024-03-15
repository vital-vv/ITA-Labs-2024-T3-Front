import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubcategories = createAsyncThunk(
  'lots/fetchSubcategories',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api/categories/${id}`
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

export const postNewLot = createAsyncThunk(
  'lots/addNewLot',
  async (lotData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api/lots`,
        lotData
      );
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      return response.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOneLot = createAsyncThunk(
  'lots/getOneLot',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api/lots/${id}`
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

export const confirmBid = createAsyncThunk(
  'lots/confirmBid',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api/bids',
        data.request,
        {
          headers: {
            Authorization: `Bearer ${data.token}`
          },
        }
      );
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const changeFirstSelector = (
  state,
  action,
  firstCurrentTarget,
  secondCurrentTarget
) => {
  state[firstCurrentTarget] = action.payload.selectedSubcategory
    .split(',')
    .map((item) => ({ name: item }));
  state[secondCurrentTarget] = action.payload.chosenOption;
};

const changeInputs = (state, action, currentTarget) => {
  state[currentTarget] = action.payload;
};

const changeAndValidationInputs = (
  state,
  action,
  currentTarget,
  adressValidation
) => {
  action.payload = +action.payload;
  if (isNaN(action.payload) || action.payload < 0) {
    state[adressValidation] = false;
    return;
  }
  changeInputs(state, action, currentTarget);
  state[adressValidation] = true;
};

const changeValidationAfterTime = (state, validationAdress) => {
  state[validationAdress] = !state[validationAdress];
};

const checkValidationForm = (state) => {
  const valuesChecked = Object.values(state);
  valuesChecked.splice(33);
  valuesChecked.every((item) => item)
    ? (state.fullValidationForm = true)
    : (state.fullValidationForm = false);
};

const addFilesPictures = (state, action) => {
  const files = action.payload.payload;
  const validFiles = [];
  let invalidFileFound = false;
  files.forEach((file) => {
    if (file.size > 1024 * 1024 * 5) {
      alert('Your file is too large');
      invalidFileFound = true;
    } else {
      validFiles.push(file);
    }
  });
  if (!invalidFileFound) {
    state.picturesFiles = [...state.picturesFiles, ...validFiles];
  }
};

const inputSliderByKeys = (state, action, currentIndex, targetValidation) => {
  action.payload = +action.payload;
  if (isNaN(action.payload) || action.payload > state.sliderLimitCurrent[1]) {
    state[targetValidation] = false;
    state.sliderCurrent[currentIndex] = state.sliderLimitCurrent[currentIndex];
    return;
  }
  state.sliderCurrent[currentIndex] = action.payload;
};

const replacingCurrentMeasure = (state, targetMeasure, limitMeasure) => {
  state.sliderCurrent = state[targetMeasure];
  state.sliderLimitCurrent = state[limitMeasure];
};

const checkOnMaxSymbols = (
  state,
  checkedBranchState,
  maxSymbols,
  resultBranchState
) => {
  if (state[checkedBranchState].length > maxSymbols) {
    state[resultBranchState] = false;
  } else {
    state[resultBranchState] = true;
  }
};

const compareMinimalBetWithPrice = (
  state,
  minimalBet,
  price,
  minimalBetValid,
  priceValid
) => {
  if (state[minimalBet] >= state[price]) {
    state[minimalBetValid] = false;
    state[priceValid] = false;
    state.isValidComparingMinBetAndPricing = false;
  }
};

const lotsSlice = createSlice({
  name: 'lots',
  initialState: {
    regions: null,
    subcategories: null,
    currentCountry: '',
    currentRegion: '',
    currentCategory: '',
    currentIdCategory: 0,
    currentSubcategory: '',
    title: '',
    inputTitleValid: true,
    currentWeight: '',
    inputWeightValid: true,
    currentPrice: '',
    inputPriceValid: true,
    currentWeightMeasure: 'ton',
    currentPricingMeasure: 'USD',
    currentValidity: 30,
    isValidValidity: true,
    picturesFiles: [],
    currentVariety: 'aiwa', //point out the first elem of categories' array
    sliderLimitCurrent: [40, 100],
    sliderLimitMm: [40, 100],
    sliderLimitCm: [4, 10],
    sliderCurrentCm: [5, 8],
    sliderCurrentMm: [50, 80],
    sliderCurrent: [50, 80],
    validSliderFrom: true,
    validSliderUntil: true,
    currentMeasure: 'mm',
    minimalBet: '',
    inputMinimalBetValid: true,
    isValidComparingMinBetAndPricing: true,
    currentPackages: 'Box',
    isDescriptionValid: true,
    fullValidationForm: false,
    description: '',
    isSuccessAdding: false,
    isProcess: false,
    expirationDate: '',
    createdDate: '',
    currentBid: '',
    isValidBid: true,
    currentId: '',
    showModalSuccess: false,
    leadBet: 0,
    correctRangeBets: false,
    idForBid: 0,
  },
  reducers: {
    changeFirstOption(state, action) {
      changeFirstSelector(state, action, 'regions', 'currentCountry');
      checkValidationForm(state);
    },
    changeFirstOptionCat(state, action) {
      state.currentCategory = action.payload.category;
      checkValidationForm(state);
    },
    changeRegion(state, action) {
      changeInputs(state, action, 'currentRegion');
      checkValidationForm(state);
    },
    changeSubcategory(state, action) {
      changeInputs(state, action, 'currentSubcategory');
      state.currentIdCategory = action.payload.id;
      state.currentSubcategory = action.payload.subcategory;
      checkValidationForm(state);
    },
    changeTitle(state, action) {
      changeInputs(state, action, 'title');
      checkOnMaxSymbols(state, 'title', 40, 'inputTitleValid');
      checkValidationForm(state);
    },
    changeWeight(state, action) {
      changeAndValidationInputs(
        state,
        action,
        'currentWeight',
        'inputWeightValid'
      );
      checkValidationForm(state);
    },
    changePrice(state, action) {
      state.isValidComparingMinBetAndPricing = true;
      state.inputMinimalBetValid = true;
      changeAndValidationInputs(
        state,
        action,
        'currentPrice',
        'inputPriceValid'
      );
      compareMinimalBetWithPrice(
        state,
        'minimalBet',
        'currentPrice',
        'inputMinimalBetValid',
        'inputPriceValid'
      );
      checkValidationForm(state);
    },
    changeValidationAfterTimeWeight(state) {
      changeValidationAfterTime(state, 'inputWeightValid');
      checkValidationForm(state);
    },
    changeValidationAfterTimePrice(state) {
      if (state.isValidComparingMinBetAndPricing) {
        changeValidationAfterTime(state, 'inputPriceValid');
        checkValidationForm(state);
      }
    },
    changeQuantity(state, action) {
      changeInputs(state, action, 'currentWeightMeasure');
      checkValidationForm(state);
    },
    changeCurrency(state, action) {
      changeInputs(state, action, 'currentPricingMeasure');
      checkValidationForm(state);
    },
    changeValidity(state, action) {
      action.payload = +action.payload;
      if (isNaN(action.payload) || action.payload < 0 || action.payload > 30) {
        state.currentValidity = 30;
        state.isValidValidity = false;
        return;
      }
      changeInputs(state, action, 'currentValidity');
      state.isValidValidity = true;
      checkValidationForm(state);
    },
    changeValidationAfterTimeValidity(state) {
      changeValidationAfterTime(state, 'isValidValidity');
      checkValidationForm(state);
    },
    fileTransfer(state, action) {
      addFilesPictures(state, action);
    },
    fileChange(state, action) {
      addFilesPictures(state, action);
    },
    changeVariety(state, action) {
      changeInputs(state, action, 'currentVariety');
      checkValidationForm(state);
    },
    changeSliderValues(state, action) {
      state.sliderCurrent = action.payload.newValue;
    },
    changeSliderFromByKeys(state, action) {
      inputSliderByKeys(state, action, 0, 'validSliderFrom');
    },
    changeSliderUntilByKeys(state, action) {
      inputSliderByKeys(state, action, 1, 'validSliderUntil');
    },
    changeMeasure(state, action) {
      if (action.payload === 'cm') {
        replacingCurrentMeasure(state, 'sliderCurrentCm', 'sliderLimitCm');
        state.currentMeasure = action.payload;
      } else {
        replacingCurrentMeasure(state, 'sliderCurrentMm', 'sliderLimitMm');
        state.currentMeasure = action.payload;
      }
    },
    changeMinimalBet(state, action) {
      state.isValidComparingMinBetAndPricing = true;
      state.inputPriceValid = true;
      changeAndValidationInputs(
        state,
        action,
        'minimalBet',
        'inputMinimalBetValid'
      );
      if (state.currentPrice !== '') {
        compareMinimalBetWithPrice(
          state,
          'minimalBet',
          'currentPrice',
          'inputMinimalBetValid',
          'inputPriceValid'
        );
      }
      checkValidationForm(state);
    },
    changeValidationAfterTimeMinimalBet(state) {
      if (state.isValidComparingMinBetAndPricing) {
        changeValidationAfterTime(state, 'inputMinimalBetValid');
        checkValidationForm(state);
      }
    },
    changePackaging(state, action) {
      changeInputs(state, action, 'currentPackages');
      checkValidationForm(state);
    },
    addSubscribe(state, action) {
      changeInputs(state, action, 'description');
      checkOnMaxSymbols(state, 'description', 200, 'isDescriptionValid');
      checkValidationForm(state);
    },
    resetState(state) {
      state.currentCountry = '';
      state.currentRegion = '';
      state.currentIdCategory = 0;
      state.currentSubcategory = '';
      state.currentCategory = '';
      state.title = '';
      state.currentWeight = '';
      state.currentPrice = '';
      state.sliderLimitCurrent = [40, 100];
      state.sliderCurrent = [50, 80];
      state.minimalBet = '';
      state.currentId = '';
      state.currentBid = '';
      state.leadBet = 0;
    },
    addNewBid(state, action) {
      state.correctRangeBets = false;
      changeAndValidationInputs(state, action, 'currentBid', 'isValidBid');
      if (
        state.currentBid >= state.leadBet + 1 &&
        state.currentBid < state.currentPrice - 1
      ) {
        state.correctRangeBets = true;
      }
    },
    changeNewBidValidationAfterTime(state) {
      changeValidationAfterTime(state, 'isValidBid');
    },
    changeShowModalAfterTime(state) {
      changeValidationAfterTime(state, 'showModalSuccess');
    },
    changeModalThrough(state, action) {
      state.idForBid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategories = action.payload.subcategories;
      })
      .addCase(postNewLot.pending, (state) => {
        state.isSuccessAdding = false;
        state.isProcess = true;
      })
      .addCase(postNewLot.fulfilled, (state, action) => {
        if (Number(action.payload) === 200) {
          state.isSuccessAdding = true;
        }
        state.isProcess = false;
      })
      .addCase(postNewLot.rejected, (state) => {
        state.isProcess = false;
        state.isSuccessAdding = false;
      })
      .addCase(getOneLot.fulfilled, (state, action) => {
        const data = action.payload;
        state.fullValidationForm = false;
        state.currentRegion = data.location.region;
        state.currentCountry = data.location.country;
        state.currentWeightMeasure = data.weight;
        state.sliderCurrent = data.size;
        state.title = data.title;
        state.currentWeight = data.quantity;
        state.currentPrice = data.price_per_unit * data.quantity;
        state.currentVariety = data.variety;
        state.currentPackages = data.packaging;
        state.description = data.description;
        state.expirationDate = data.expiration_date;
        state.createdDate = data.created_at;
        state.currentId = data.lot_id;
        state.leadBet = data.leading ? data.leading.amount : 0;
      })
      .addCase(confirmBid.fulfilled, (state) => {
        state.showModalSuccess = true;
        state.leadBet = state.currentBid;
        state.currentBid = '';
      });
  },
});

export const {
  changeFirstOption,
  changeFirstOptionCat,
  changeRegion,
  changeSubcategory,
  changeTitle,
  changeWeight,
  changePrice,
  changeValidationAfterTimeWeight,
  changeValidationAfterTimePrice,
  changeQuantity,
  changeCurrency,
  changeValidity,
  changeValidationAfterTimeValidity,
  fileTransfer,
  fileChange,
  changeVariety,
  changeSliderValues,
  changeSliderFromByKeys,
  changeSliderUntilByKeys,
  changeMeasure,
  changeMinimalBet,
  changeValidationAfterTimeMinimalBet,
  changePackaging,
  addSubscribe,
  resetState,
  addNewBid,
  changeNewBidValidationAfterTime,
  changeShowModalAfterTime,
  changeModalThrough,
  openBetsModal,
} = lotsSlice.actions;

export default lotsSlice.reducer;

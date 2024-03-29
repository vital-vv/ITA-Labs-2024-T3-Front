import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.js';

export const fetchSubcategories = createAsyncThunk(
  'lots/fetchSubcategories',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/${id}`);
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
  async (lotData, { rejectWithValue, getState }) => {
    const { picturesFiles } = getState().lots;
    const formData = new FormData();
    formData.append(
      'lot',
      new Blob([JSON.stringify(lotData)], { type: 'application/json' })
    );
    const arrayPictures = picturesFiles.map((item) => item.file);
    arrayPictures.forEach(item => {   
      formData.append('images', item)
    })
    try {
      const response = await api.post(`/lots`, formData);
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
      const response = await api.get(`/lots/${id}`);
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
      const response = await api.post('/bids', data);
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRegionsCurrentCountry = createAsyncThunk(
  'main/fetchRegionsCurrentCountry',
  async (currentCountry, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/data-selection/${currentCountry}/cities`
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
  if (state.picturesFiles.length === 0 || state.picturesFiles.length > 9) {
    return;
  }
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
    if (state.mainPicture === '') {
      state.picturesFiles[0].isMainImage = true;
      state.mainPicture = state.picturesFiles[0].url;
      state.bigPicture = state.mainPicture;
    }
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

const findIndexPicture = (state, findElem) => {
  return state.picturesFiles.findIndex((file) => file.url === state[findElem]);
};

const lotsSlice = createSlice({
  name: 'lots',
  initialState: {
    regions: null,
    subcategories: null,
    varieties: null,
    currentCountry: '',
    currentRegion: '',
    currentCategory: '',
    currentIdCategory: 0,
    currentIdVariety: 0,
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
    currentVariety: '',
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
    mainPicture: '',
    bigPicture: '',
  },
  reducers: {
    changeFirstOption(state, action) {
      state.currentCountry = action.payload;
    },
    changeFirstOptionCat(state, action) {
      state.currentCategory = action.payload.category;
      checkValidationForm(state);
    },
    changeRegion(state, action) {
      changeInputs(state, action, 'currentRegion');
      checkValidationForm(state);
    },
    refreshCurrentCategory(state) {
      state.currentCategory = state.subcategories[0].name;
    },
    changeSubcategory(state, action) {
      changeInputs(state, action, 'currentSubcategory');
      state.currentIdCategory = action.payload.id;
      state.currentSubcategory = action.payload.subcategory;
      checkValidationForm(state);
    },
    getActualVariety(state) {
      if (state.subcategories === null || state.currentIdCategory === 0) {
        return;
      }
      const { subcategories } = state.subcategories.find(
        (subcategory) =>
          subcategory.category_id === Number(state.currentIdCategory)
      );
      state.varieties = subcategories;
      state.currentVariety = state.varieties[0].name;
      state.currentIdVariety = state.varieties[0].category_id;
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
      checkValidationForm(state);
    },
    fileChange(state, action) {
      addFilesPictures(state, action);
      checkValidationForm(state);
    },
    changeVariety(state, action) {
      state.currentVariety = action.payload.variety;
      state.currentIdVariety = action.payload.id;
      checkValidationForm(state);
    },
    changeSliderValues(state, action) {
      state.sliderCurrent = action.payload.newValue;
    },
    changeSliderFromByKeys(state, action) {
      inputSliderByKeys(state, action, 0, 'validSliderFrom');
    },
    changeValidationAfterTimeSliderFrom(state) {
      changeValidationAfterTime(state, 'validSliderFrom');
      checkValidationForm(state);
    },
    changeSliderUntilByKeys(state, action) {
      inputSliderByKeys(state, action, 1, 'validSliderUntil');
    },
    changeValidationAfterTimeSliderUntil(state) {
      changeValidationAfterTime(state, 'validSliderUntil');
      checkValidationForm(state);
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
      state.minimalBet = '';
      state.picturesFiles = [];
      state.varieties = '';
      state.regions = null;
      state.subcategories = null;
      state.currentValidity = 30;
      state.currentPackages = 'Box';
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
    deleteImage(state, action) {
      state.picturesFiles = state.picturesFiles.filter(
        (picture) => picture.url !== action.payload
      );
      if (state.picturesFiles.length === 0) {
        state.mainPicture = '';
        state.bigPicture = '';
        state.fullValidationForm = false;
        return;
      }
      if (state.mainPicture === action.payload) {
        state.mainPicture = state.picturesFiles[0].url;
      }
    },
    changeMainPicture(state, action) {
      state.picturesFiles.forEach((file) => {
        file.isMainImage = false;
      });
      state.mainPicture = action.payload;
      const index = findIndexPicture(state, 'mainPicture');
      state.picturesFiles[index].isMainImage = true;
      state.bigPicture = state.mainPicture;
    },
    changeBigPicture(state, action) {
      state.bigPicture = action.payload;
    },
    showNextImage(state) {
      const index = findIndexPicture(state, 'bigPicture');
      if (index === state.picturesFiles.length - 1) {
        state.bigPicture = state.picturesFiles[0].url;
        return;
      }
      state.bigPicture = state.picturesFiles[index + 1].url;
    },
    showPreviousImage(state) {
      const index = findIndexPicture(state, 'bigPicture');
      if (index === 0) {
        state.bigPicture =
          state.picturesFiles[state.picturesFiles.length - 1].url;
        return;
      }
      state.bigPicture = state.picturesFiles[index - 1].url;
    },
    noteActive(state) {
      state.picturesFiles.forEach((picture) => (picture.isActive = false));
      const index = findIndexPicture(state, 'bigPicture');
      state.picturesFiles[index] = {
        ...state.picturesFiles[index],
        isActive: true,
      };
    },
    standFirstMainImage(state) {
      const arrayForProcedure = [...state.picturesFiles];
      const index = arrayForProcedure.findIndex(item => item.isMainImage === true);
      arrayForProcedure.unshift(arrayForProcedure[index]);
      arrayForProcedure.splice(index + 1, 1);
      state.picturesFiles = arrayForProcedure;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategories = action.payload.subcategories;
        state.currentSubcategory = state.subcategories[0].name;
        state.currentIdCategory = state.subcategories[0].category_id;
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
        state.currentPrice = data.total_price;
        state.currentVariety = data.variety;
        state.currentPackages = data.packaging;
        state.description = data.description;
        state.expirationDate = data.expiration_date;
        state.createdDate = data.created_at;
        state.currentId = data.lot_id;
        state.leadBet = data.leading ? data.leading.amount : 0;
        state.bigPicture = data.image_url[0].url;
        state.picturesFiles = data.image_url;
        state.minimalBet = data.start_price;
      })
      .addCase(confirmBid.fulfilled, (state) => {
        state.showModalSuccess = true;
        state.leadBet = state.currentBid;
        state.currentBid = '';
      })
      .addCase(getRegionsCurrentCountry.fulfilled, (state, action) => {
        state.regions = action.payload;
        state.regions = action.payload.map((region) => {
          return { name: region };
        });
        state.currentRegion = state.regions[0].name;
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
  deleteImage,
  changeMainPicture,
  changeBigPicture,
  showNextImage,
  showPreviousImage,
  noteActive,
  getActualVariety,
  changeValidationAfterTimeSliderFrom,
  changeValidationAfterTimeSliderUntil,
  standFirstMainImage
} = lotsSlice.actions;

export default lotsSlice.reducer;

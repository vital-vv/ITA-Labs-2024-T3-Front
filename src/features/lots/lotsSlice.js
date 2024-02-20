import { createSlice, current } from '@reduxjs/toolkit';

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
  valuesChecked.pop();
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

const lotsSlice = createSlice({
  name: 'lots',
  initialState: {
    regions: null,
    subcategories: null,
    currentCountry: '',
    currentRegion: '',
    currentCategory: '',
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
    currentPackages: 'Box',
    fullValidationForm: false,
  },
  reducers: {
    changeFirstOption(state, action) {
      changeFirstSelector(state, action, 'regions', 'currentCountry');
      checkValidationForm(state);
    },
    changeFirstOptionCat(state, action) {
      changeFirstSelector(state, action, 'subcategories', 'currentCategory');
      checkValidationForm(state);
    },
    changeRegion(state, action) {
      changeInputs(state, action, 'currentRegion');
      checkValidationForm(state);
    },
    changeSubcategory(state, action) {
      changeInputs(state, action, 'currentSubcategory');
      checkValidationForm(state);
    },
    changeTitle(state, action) {
      changeInputs(state, action, 'title');
      if (state.title.length > 40) {
        state.inputTitleValid = false;
      } else {
        state.inputTitleValid = true;
      }
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
      changeAndValidationInputs(
        state,
        action,
        'currentPrice',
        'inputPriceValid'
      );
      checkValidationForm(state);
    },
    changeValidationAfterTimeWeight(state) {
      changeValidationAfterTime(state, 'inputWeightValid');
      checkValidationForm(state);
    },
    changeValidationAfterTimePrice(state) {
      changeValidationAfterTime(state, 'inputPriceValid');
      checkValidationForm(state);
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
      changeAndValidationInputs(
        state,
        action,
        'minimalBet',
        'inputMinimalBetValid'
      );
      checkValidationForm(state);
    },
    changeValidationAfterTimeMinimalBet(state) {
      changeValidationAfterTime(state, 'inputMinimalBetValid');
      checkValidationForm(state);
    },
    changePackaging (state, action) {
      changeInputs(state, action, 'currentPackages');
      checkValidationForm(state);
    }
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
} = lotsSlice.actions;

export default lotsSlice.reducer;

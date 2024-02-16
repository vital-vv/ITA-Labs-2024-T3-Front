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
    currentPricingMeasure: 'ton',
    currentWeightMeasure: 'USD',
    currentValidity: 30,
    isValidValidity: true,
  },
  reducers: {
    changeFirstOption(state, action) {
      changeFirstSelector(state, action, 'regions', 'currentCountry');
    },
    changeFirstOptionCat(state, action) {
      changeFirstSelector(state, action, 'subcategories', 'currentCategory');
    },
    changeRegion(state, action) {
      changeInputs(state, action, 'currentRegion');
    },
    changeSubcategory(state, action) {
      changeInputs(state, action, 'currentSubcategory');
    },
    changeTitle(state, action) {
      changeInputs(state, action, 'title');
      if (state.title.length > 40) {
        state.inputTitleValid = false;
      } else {
        state.inputTitleValid = true;
      }
    },
    changeWeight(state, action) {
      changeAndValidationInputs(
        state,
        action,
        'currentWeight',
        'inputWeightValid'
      );
    },
    changePrice(state, action) {
      changeAndValidationInputs(
        state,
        action,
        'currentPrice',
        'inputPriceValid'
      );
    },
    changeValidationAfterTimeWeight(state) {
      changeValidationAfterTime(state, 'inputWeightValid');
    },
    changeValidationAfterTimePrice(state) {
      changeValidationAfterTime(state, 'inputPriceValid');
    },
    changeQuantity(state, action) {
      changeInputs(state, action, 'currentWeightMeasure');
    },
    changeCurrency(state, action) {
      changeInputs(state, action, 'currentPricingMeasure');
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
    },
    changeValidationAfterTimeValidity(state) {
        changeValidationAfterTime(state, 'isValidValidity');
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
} = lotsSlice.actions;

export default lotsSlice.reducer;

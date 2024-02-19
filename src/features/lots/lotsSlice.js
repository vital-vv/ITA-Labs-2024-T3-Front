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

const checkValidationForm = state => {
    const valuesChecked = Object.values(state);
    valuesChecked.pop();
    valuesChecked.every(item => item) ? state.fullValidationForm = true : state.fullValidationForm = false;
}

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
      checkValidationForm(state)
    },
    changeValidationAfterTimePrice(state) {
      changeValidationAfterTime(state, 'inputPriceValid');
      checkValidationForm(state)
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

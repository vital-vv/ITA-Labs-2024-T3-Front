import { createSlice } from '@reduxjs/toolkit';

const payloadToNumber = (string) => Number(string);

const changeInputsByKeys = (state, action, index, currentLimit, formValidation, currentForm) => {
  action.payload = payloadToNumber(action.payload);
  if (
    isNaN(action.payload) ||
    action.payload > state[currentLimit][1] ||
    action.payload < state[currentLimit][0]
  ) {
    state[formValidation][index] = false;
    state[currentForm][index] = 0;
    return;
  }
  state[formValidation][index] = true;
  state[currentForm][index] = +action.payload;
};

const toogleSlider = (store, measure, boolean) => {
  store.sizeMeasuresToMm = boolean;
  store.sliderCurrentValues = store.sliderDefaultValues[measure];
  store.sliderCurrentLimit = store.minMaxSlider[measure];
};

const toggleMeasuresQuantityAndValutes = (state, action, currentMeasure, initialMeasure) => {
  action.payload = payloadToNumber(action.payload);
  switch (action.payload) {
    case 1:
      state[currentMeasure] = state[initialMeasure][1];
      break;
    case 2:
      state[currentMeasure] = state[initialMeasure][2];
      break;
    default:
      state[currentMeasure] = state[initialMeasure][0];
      break;
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    sliderDefaultValues: { mm: [200, 600], cm: [5, 15] },
    minMaxSlider: { mm: [0, 1000], cm: [0, 20] },
    sizing: ['mm', 'cm'],
    sliderCurrentValues: [200, 600],
    sliderCurrentLimit: [0, 1000],
    quantityValues: [1, 10000],
    quantityLimits: [1, 10000],
    isValidFormSizing: [true, true],
    sizeMeasuresToMm: true,
    valuesOfQuantity: ['ton', 'kg', 'pcs'],
    valueOfQuantityCurrent: 'ton',
    isValidFormQuantity: [true, true],
    valuesOfValutes: ['USD', 'EUR', 'BYN'],
    currentValute: 'USD',
    sumCurrent: [1, 100000],
    sumLimits: [1, 1000000],
    isValidFormSum: [true, true],
    chosenOptions: [],
    apples: [
      { name: 'alwa', id:1, isChecked: false },
      { name: 'antonowka', id:2, isChecked: false },
      { name: 'boiken', id:3, isChecked: false },
      { name: 'boskoop', id:4,  isChecked: false },
      { name: 'braeburn', id:5, isChecked: false },
      { name: 'champion', id:6, isChecked: false },
    ],
    
    packages: [
      { name: 'Box', id:7, isChecked: false },
      { name: 'Basket', id:8, isChecked: false },
      { name: 'Carton', id:9, isChecked: false },
      { name: 'Bag', id:10, isChecked: false },
      { name: 'Crate', id:11, isChecked: false },
      { name: 'Bottle', id:12, isChecked: false },
      { name: 'Bunch', id: 13, isChecked: false },
      { name: 'Sack', id:14, isChecked: false },
    ],
    
    locations: [
      { name: 'Andijan region', id:15, isChecked: false },
      { name: 'Bukhara region', id:16, isChecked: false },
      { name: 'Republic of Karakalpakstan', id:17, isChecked: false },
      { name: 'Namangan region', id:18, isChecked: false },
      { name: 'Navoiy region', id:19, isChecked: false },
      { name: 'Qashqadaryo region', id:20, isChecked: false },
    ],
  },
  reducers: {
    changeSliderValues(state, action) {
      state.sliderCurrentValues = action.payload.newValue;
    },
    changeSliderByKeysFrom(state, action) {
      changeInputsByKeys(state, action, 0, 'sliderCurrentLimit', 'isValidFormSizing', 'sliderCurrentValues');
    },
    changeSliderByKeysUntil(state, action) {
      changeInputsByKeys(state, action, 1, 'sliderCurrentLimit', 'isValidFormSizing', 'sliderCurrentValues');
    },
    toggleMeasures(state, action) {
      action.payload = payloadToNumber(action.payload);
      if (action.payload === 1) {
        toogleSlider(state, 'cm', false);
      } else {
        toogleSlider(state, 'mm', true);
      }
    },
    toggleMeasuresQuantity(state, action) {
      toggleMeasuresQuantityAndValutes(state, action, 'valueOfQuantityCurrent', 'valuesOfQuantity');
    },
    changeInputQuantityFrom(state, action) {
      changeInputsByKeys(state, action, 0, 'quantityLimits', 'isValidFormQuantity', 'quantityValues');
    },
    changeInputQuantityUntil(state, action) {
      changeInputsByKeys(state, action, 1, 'quantityLimits', 'isValidFormQuantity', 'quantityValues');
    },
    changeMeasuresValutes(state, action) {
      toggleMeasuresQuantityAndValutes(state, action, 'currentValute', 'valuesOfValutes');
    },
    changeInputSumFrom(state, action) {
      changeInputsByKeys(state, action, 0, 'sumLimits', 'isValidFormSum', 'sumCurrent');
    },
    changeInputSumUntil(state, action) {
      changeInputsByKeys(state, action, 1, 'sumLimits', 'isValidFormSum', 'sumCurrent');
    },
    choseCheckbox(state, action) {
      state.chosenOptions = [...state.chosenOptions, action.payload];
    }
  },
});

export const {
  changeSliderValues,
  changeSliderByKeysFrom,
  changeSliderByKeysUntil,
  toggleMeasures,
  toggleMeasuresQuantity,
  changeInputQuantityFrom,
  changeInputQuantityUntil,
  changeMeasuresValutes,
  changeInputSumFrom,
  changeInputSumUntil,
  choseCheckbox
} = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const changeSliderByKeys = (state, action, index) => {
  let number = Number(action.payload);
  if (isNaN(number) || number > state.sliderCurrentLimit[1] || number < state.sliderCurrentLimit[0]) {
    state.isValidFormSizing[index] = false;
    state.sliderCurrentValues[index] = 0;
    return;
  }
  state.isValidFormSizing[index] = true;
  state.sliderCurrentValues[index] = +action.payload;
};

const toogleSlider = (store, measure, boolean) => {
  store.sizeMeasuresToMm = boolean;
  store.sliderCurrentValues = store.sliderDefaultValues[measure];
  store.sliderCurrentLimit = store.minMaxSlider[measure];
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    sliderDefaultValues: { mm: [200, 600], cm: [5, 15] },
    minMaxSlider: { mm: [0, 1000], cm: [0, 20] },
    sliderCurrentValues: [200, 600],
    sliderCurrentLimit: [0, 1000],
    quantityDefaultValues: [1, 1000],
    isValidFormSizing: [true, true],
    sizeMeasuresToMm: true,
  },
  reducers: {
    changeSliderValues(state, action) {
      state.sliderCurrentValues = action.payload.newValue;
    },
    changeSliderByKeysFrom(state, action) {
      changeSliderByKeys(state, action, 0);
    },
    changeSliderByKeysUntil(state, action) {
      changeSliderByKeys(state, action, 1);
    },
    toogleMeasures(state, action) {
      action.payload = +action.payload;
      if (action.payload === 1) {
        toogleSlider(state, 'cm', false);
      } else {
        toogleSlider(state, 'mm', true);
      }
    },
  },
});

export const {
  changeSliderValues,
  changeSliderByKeysFrom,
  changeSliderByKeysUntil,
  toogleMeasures,
} = filterSlice.actions;

export default filterSlice.reducer;

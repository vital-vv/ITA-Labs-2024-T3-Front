import { createSlice } from '@reduxjs/toolkit';

const changeSliderByKeys = (state, action, index, maxSlider) => {
  let number = Number(action.payload);
  if (isNaN(number) || number > maxSlider) {
    state.isValidFormSizing[index] = false;
    state.sliderDefaultValues[index] = 0;
    return;
  }
  state.isValidFormSizing[index] = true;
  state.sliderDefaultValues[index] = +action.payload;
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    sliderDefaultValues: [200, 600],
    sliderValuesCm: [5, 20],
    minMaxSlider: [0, 1000],
    quantityDefaultValues: [1, 1000],
    isValidFormSizing: [true, true],
    sizeMeasuresToMm: true,
  },
  reducers: {
    changeSliderValues(state, action) {
      state.sliderDefaultValues = action.payload.newValue;
    },
    changeSliderByKeysFrom(state, action) {
      changeSliderByKeys(state, action, 0, minMaxSlider[1]);
    },
    changeSliderByKeysUntil(state, action) {
      changeSliderByKeys(state, action, 1, minMaxSlider[1]);
    },
    toogleMeasures(state, action) {
        action.payload = +action.payload;
        if (action.payload === 1) {
            state.sizeMeasuresToMm = false;
        } else {
            state.sizeMeasuresToMm = true;
        }
    }
  },
});

export const {
  changeSliderValues,
  changeSliderByKeysFrom,
  changeSliderByKeysUntil,
  toogleMeasures,
} = filterSlice.actions;

export default filterSlice.reducer;

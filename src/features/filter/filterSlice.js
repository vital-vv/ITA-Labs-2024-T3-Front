import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        sliderDefaultValues: [200, 600],
    },
    reducers: {
        changeSliderValues (state, action) {
            state.sliderDefaultValues = action.payload.newValue;
        },
        changeSliderByKeysFrom (state, action) {
            state.sliderDefaultValues[0] = action.payload;
        }, 
        changeSliderByKeysUntil (state, action) {
            state.sliderDefaultValues[1] = action.payload;
        }, 

    }
})

export const {changeSliderValues, changeSliderByKeysFrom, changeSliderByKeysUntil} = filterSlice.actions;

export default filterSlice.reducer;
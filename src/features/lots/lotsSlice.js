import { createSlice } from "@reduxjs/toolkit";

const changeFirstSelector = (state, action, firstCurrentTarget, secondCurrentTarget) => {
    state[firstCurrentTarget] = action.payload.selectedSubcategory.split(',').map(item => ({name: item}));
    state[secondCurrentTarget] = action.payload.chosenOption; 
}

const changeSecondSelector = (state, action, currentTarget) => {
    state[currentTarget] = action.payload;
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
    },
    reducers: {
        changeFirstOption (state, action) {
            changeFirstSelector(state, action, 'regions', 'currentCountry');
        },
        changeFirstOptionCat (state, action) {
            changeFirstSelector(state, action, 'subcategories', 'currentCategory');
        },
        changeRegion (state, action) {
            changeSecondSelector(state, action, 'currentRegion');
        },
        changeSubcategory (state, action) {
            changeSecondSelector(state, action, 'currentSubcategory');
        },    
    }
})

export const {changeFirstOption, changeFirstOptionCat, changeRegion, changeSubcategory} = lotsSlice.actions;

export default lotsSlice.reducer;

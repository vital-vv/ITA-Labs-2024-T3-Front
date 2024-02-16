import {configureStore} from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice.js';
import usersSlice from './users/usersSlice.js';
import filterSlice from './filter/filterSlice.js';
import mainSlice from './main/mainSlice.js';
import lotsSlice from './lots/lotsSlice.js';


export const store = configureStore({
    reducer: {
        main: mainSlice,
        lots: lotsSlice,
        categories: categoriesSlice,
        users: usersSlice,
        filter: filterSlice,
    },
    devTools: true,
});
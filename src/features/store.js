import {configureStore} from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice.js';
import usersSlice from './users/usersSlice.js';

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        users: usersSlice,
    },
    devTools: true,
});
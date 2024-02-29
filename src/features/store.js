import {configureStore} from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice.js';
import usersSlice from './users/usersSlice.js';
import filterSlice from './filter/filterSlice.js';
import subcategoriesSlice from "./categories/subcategoriesSlice.js";
import currentUserSlice from "./currentUser/currentUserSlice.js";


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        categories: categoriesSlice,
        subcategories: subcategoriesSlice,
        users: usersSlice,
        filter: filterSlice,
    },
    devTools: true,
});
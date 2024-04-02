import {configureStore} from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice.js';
import usersSlice from './users/usersSlice.js';
import filterSlice from './filter/filterSlice.js';
import subcategoriesSlice from "./categories/subcategoriesSlice.js";
import currentUserSlice from "./currentUser/currentUserSlice.js";
import mainSlice from './main/mainSlice.js';
import lotsSlice from './lots/lotsSlice.js';
import imagesSlice from "./categories/imagesSlice.js";

export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        main: mainSlice,
        lots: lotsSlice,
        categories: categoriesSlice,
        subcategories: subcategoriesSlice,
        users: usersSlice,
        filter: filterSlice,
        images: imagesSlice,
    },
});
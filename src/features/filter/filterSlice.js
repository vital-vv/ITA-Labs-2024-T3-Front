import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../utils/axios.js';

export const applyFilters = createAsyncThunk(
    'filters/applyFilters',
    async (_, {rejectWithValue, getState}) => {
        const {stringFilter, sortField, currentPage, currentCategoryId} =
            getState().filter;
        try {
            const response = await api.get(
                `/categories/${currentCategoryId}/lots?page=${currentPage}&limit=8${stringFilter}${sortField}`
            );
            if (response.status !== 200) {
                throw new Error('Something went wrong');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteLot = createAsyncThunk(
    'lots/deleteLot',
    async (lotId, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/lots/${lotId}`);
            if (response.status !== 204) {
                throw new Error('Something went wrong');
            }
            return lotId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllLots = createAsyncThunk(
    'filters/getAllLots',
    async (params, {rejectWithValue}) => {
        try {
            const response = await api.get(`/lots`, {params});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllOrders = createAsyncThunk(
    'filters/getAllOrders',
    async (_,{rejectWithValue}) => {
        try {
            const response = await api.get(`/requests`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserLots = createAsyncThunk(
    'filters/getUserLots',
    async (params, {rejectWithValue}) => {
        try {
            const response = await api.get(`/users/lots`, {params});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loadUserAllBets = createAsyncThunk(
    'filters/loadUserAllBets',
    async (params, {rejectWithValue}) => {
        try {
            const response = await api.get(`/users/bids`, {params});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserOrders = createAsyncThunk(
    'filters/getUserOrders',
    async (params, {rejectWithValue}) => {
        try {
            const response = await api.get(`/users/requests`, {params});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const buyLot = createAsyncThunk(
    'filters/buyLot',
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.post(`/lots/${id}/buy`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const confirmLot = createAsyncThunk(
    'filters/confirmLot',
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.post(`/lots/${id}/confirm`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const approveLot = createAsyncThunk(
    'filters/approveLot',
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.post(`/lots/${id}/approve`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const rejectLot = createAsyncThunk(
    'filters/rejectLot',
    async ({id, description}, {rejectWithValue}) => {
        try {
            const response = await api.post(`/lots/${id}/reject`, description);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deactivateLot = createAsyncThunk(
    'filters/deactivateLot',
    async (id, {rejectWithValue}) => {
        try {
            console.log(id)
            const response = await api.post(`/lots/${id}/deactivate`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const payloadToNumber = (string) => Number(string);

const changeInputsByKeys = (
    state,
    action,
    index,
    currentLimit,
    formValidation,
    currentForm
) => {
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

const toggleMeasuresQuantityAndValutes = (
    state,
    action,
    currentMeasure,
    initialMeasure
) => {
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

const findAndToggleElement = (array, findParameter) => {
    const elementIndex = array.findIndex((item) => item.id === findParameter);
    if (elementIndex !== -1) {
        array[elementIndex].isChecked = !array[elementIndex].isChecked;
    }
};

const toggleElementsAllArrays = (
    firstArray,
    secondArray,
    thirdArray,
    findParameter
) => {
    findAndToggleElement(firstArray, findParameter);
    findAndToggleElement(secondArray, findParameter);
    findAndToggleElement(thirdArray, findParameter);
};

const filterArray = (array, deletedElement) => {
    return (array = array.filter((item) => Number(item.id) !== deletedElement));
};

const toogleModal = (state, targetProperty) => {
    state[targetProperty] = !state[targetProperty];
};

const findAllFromCategory = (array, categoryName) =>
    array.filter((item) => item.categoryName === categoryName);

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        currentCategoryId: 1,
        sliderDefaultValues: {mm: [50, 150], cm: [5, 15]},
        minMaxSlider: {mm: [0, 200], cm: [0, 20]},
        sizing: null,
        sliderCurrentValues: [50, 150],
        sliderCurrentLimit: [0, 200],
        quantityValues: [1, 10000],
        quantityLimits: [1, 10000],
        isValidFormSizing: [true, true],
        sizeMeasuresToMm: true,
        valuesOfQuantity: [],
        valueOfQuantityCurrent: 'ton',
        isValidFormQuantity: [true, true],
        valuesOfValutes: [],
        currentValute: 'USD',
        sumCurrent: [1, 100000],
        sumLimits: [1, 1000000],
        isValidFormSum: [true, true],
        chosenOptions: [],
        varieties: [],
        packages: null,
        locations: [],
        sortField: '&sortField=CREATED_AT&sortOrder=DESC',
        stringFilter: '',
        currentLots: [],
        error: null,
        currentPage: 1,
        isPagination: false,
        isLoading: false,
        currentCategory: '',
        currentLabelSelector: 'New ones first',
        isLotsReady: false,
        hasNextPage: false,
        allDataFilterReady: false,
        isOpenModalBids: false,
    },
    reducers: {
        changeSliderValues(state, action) {
            state.sliderCurrentValues = action.payload.newValue;
        },
        changeSliderByKeysFrom(state, action) {
            changeInputsByKeys(
                state,
                action,
                0,
                'sliderCurrentLimit',
                'isValidFormSizing',
                'sliderCurrentValues'
            );
        },
        changeSliderByKeysUntil(state, action) {
            changeInputsByKeys(
                state,
                action,
                1,
                'sliderCurrentLimit',
                'isValidFormSizing',
                'sliderCurrentValues'
            );
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
            toggleMeasuresQuantityAndValutes(
                state,
                action,
                'valueOfQuantityCurrent',
                'valuesOfQuantity'
            );
        },
        changeInputQuantityFrom(state, action) {
            changeInputsByKeys(
                state,
                action,
                0,
                'quantityLimits',
                'isValidFormQuantity',
                'quantityValues'
            );
        },
        changeInputQuantityUntil(state, action) {
            changeInputsByKeys(
                state,
                action,
                1,
                'quantityLimits',
                'isValidFormQuantity',
                'quantityValues'
            );
        },
        changeMeasuresValutes(state, action) {
            toggleMeasuresQuantityAndValutes(
                state,
                action,
                'currentValute',
                'valuesOfValutes'
            );
        },
        changeInputSumFrom(state, action) {
            changeInputsByKeys(
                state,
                action,
                0,
                'sumLimits',
                'isValidFormSum',
                'sumCurrent'
            );
        },
        changeInputSumUntil(state, action) {
            changeInputsByKeys(
                state,
                action,
                1,
                'sumLimits',
                'isValidFormSum',
                'sumCurrent'
            );
        },
        choseCheckbox(state, action) {
            const elementId = payloadToNumber(action.payload.id);
            toggleElementsAllArrays(
                state.varieties,
                state.packages,
                state.locations,
                elementId
            );
            const sumArray = [
                ...state.varieties,
                ...state.packages,
                ...state.locations,
            ];
            const foundElement = sumArray.find((item) => item.id === elementId);
            if (
                !state.chosenOptions.some((item) => Number(item.id) === elementId) &&
                foundElement.isChecked
            ) {
                state.chosenOptions.push(action.payload);
            }
            if (!foundElement.isChecked) {
                state.chosenOptions = filterArray(state.chosenOptions, elementId);
            }
            if (state.chosenOptions.length === 0) {
                state.stringFilter = '';
            }
        },
        deleteOption(state, action) {
            const elementId = payloadToNumber(action.payload);
            state.chosenOptions = filterArray(state.chosenOptions, elementId);
            toggleElementsAllArrays(
                state.varieties,
                state.packages,
                state.locations,
                elementId
            );
            if (state.chosenOptions.length === 0) {
                state.stringFilter = '';
            }
        },
        clearAllParameters(state, {}) {
            const sumArray = [
                ...state.varieties,
                ...state.packages,
                ...state.locations,
            ];
            sumArray.forEach((item) => {
                item.isChecked = false;
            });
            state.chosenOptions = [];
            state.sizeMeasuresToMm = true;
            state.sliderCurrentValues = [200, 600];
            state.sliderCurrentLimit = [0, 1000];
            state.valueOfQuantityCurrent = 'ton';
            state.currentValute = 'USD';
            state.quantityValues = [1, 10000];
            state.sumCurrent = [1, 1000000];
            state.isOpenModalVariety = false;
            state.isOpenModalRegions = false;
            state.stringFilter = '';
        },
        getDataFormated(state, action) {
            state.packages = action.payload.packages;
            state.valuesOfValutes = action.payload.valutes;
            state.valuesOfQuantity = action.payload.quantity;
            state.locations = action.payload.regions.map((item, index) => {
                return {
                    name: item,
                    id: index + 60,
                    isChecked: false,
                    categoryName: 'locations',
                };
            });
            state.sizing = action.payload.lengthUnits.map((item) => item.name);
            state.varieties = action.payload.subcategories.subcategories.map(
                (item) => {
                    return {
                        name: item.name,
                        id: item.category_id,
                        isChecked: false,
                        categoryName: 'variety',
                    };
                }
            );
            state.allDataFilterReady = true;
        },
        toogleOpenModalVariety(state) {
            toogleModal(state, 'isOpenModalVariety');
        },
        toogleOpenModalRegions(state) {
            toogleModal(state, 'isOpenModalRegions');
        },
        sortBySelector(state, action) {
            state.currentPage = 1;
            const created = 'CREATED_AT';
            const descOrder = 'DESC';
            const ascOrder = 'ASC';
            const quantity = 'QUANTITY';
            const expDate = 'EXPIRATION_DATE';
            const size = 'SIZE';
            switch (Number(action.payload)) {
                case 1:
                    state.sortField = `&sortField=${created}&sortOrder=${descOrder}`;
                    break;
                case 2:
                    state.sortField = `&sortField=${created}&sortOrder=${ascOrder}`;
                    break;
                case 3:
                    state.sortField = `&sortField=${quantity}&sortOrder=${descOrder}`;
                    break;
                case 4:
                    state.sortField = `&sortField=${quantity}&sortOrder=${ascOrder}`;
                    break;
                case 5:
                    state.sortField = `&sortField=${expDate}&sortOrder=${descOrder}`;
                    break;
                case 6:
                    state.sortField = `&sortField=${expDate}&sortOrder=${ascOrder}`;
                    break;
                case 7:
                    state.sortField = `&sortField=${size}&sortOrder=${descOrder}`;
                    break;
                case 8:
                    state.sortField = `&sortField=${size}&sortOrder=${ascOrder}`;
                    break;
            }
        },
        sendFiltersString(state) {
            const variety = findAllFromCategory(state.chosenOptions, 'variety');
            const packaging = findAllFromCategory(state.chosenOptions, 'packaging');
            const regions = findAllFromCategory(state.chosenOptions, 'region');
            let currentValues;
            if (!state.sizeMeasuresToMm) {
                currentValues = state.sliderCurrentValues.map((item) => item * 10);
            } else {
                currentValues = state.sliderCurrentValues;
            }
            let objectOfRequest = {
                fromSize: currentValues[0],
                toSize: currentValues[1],
                fromQuantity: state.quantityValues[0],
                toQuantity: state.quantityValues[1],
                weights: state.valueOfQuantityCurrent.toUpperCase(),
                varieties: variety,
                packaging: packaging,
            };
            if (objectOfRequest.weights === 'KG') {
                objectOfRequest.weights = 'KILOGRAM';
            }
            const arrayUnique = Object.entries(objectOfRequest).filter(
                (item) => item[1].length !== 0
            );
            arrayUnique.forEach((item, _, array) => {
                if (Array.isArray(item[1])) {
                    // check array if there is arrays there.
                    item[1] = item[1].map((item) => item.name.toUpperCase());
                    while (item[1].length > 1) {
                        // if array consists more than 1 element need to make format [key, value] for adding in string request
                        array.push([item[0], item[1][item[1].length - 1]]);
                        item[1].pop();
                    }
                    item[1] = item[1].join();
                }
            });
            let requestString =
                '&' + arrayUnique.map((item) => item.join('=')).join('&');
            state.stringFilter = requestString;
        },
        loadNewPage(state) {
            if (!state.hasNextPage) {
                return;
            }
            state.currentPage = state.currentPage + 1;
            state.isPagination = true;
        },
        getCurrentCategory(state, action) {
            state.currentCategoryId = action.payload.id;
            state.currentCategory = action.payload.category;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyFilters.pending, (state) => {
                state.isLoading = true;
                state.isLotsReady = false;
            })
            .addCase(applyFilters.fulfilled, (state, action) => {
                state.isLotsReady = true;
                state.hasNextPage = action.payload.metadata.has_next;
                if (state.isPagination) {
                    state.currentLots = [...state.currentLots, ...action.payload.content];
                    state.isPagination = false;
                } else {
                    state.currentPage = 1;
                    state.currentLots = action.payload.content;
                }
                state.isLoading = false;
            })
            .addCase(applyFilters.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(deleteLot.fulfilled, (state, action) => {
                state.currentLots = state.currentLots.filter((item) => {
                    return item.lot_id !== Number(action.payload);
                });
            })
            .addCase(getAllLots.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(getAllLots.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllLots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentLots = state.currentLots = action.payload.content;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentLots = state.currentLots = action.payload.content;
            })
            .addCase(getUserLots.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(getUserLots.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserLots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentLots = state.currentLots = action.payload.content;
            })
            .addCase(loadUserAllBets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadUserAllBets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentLots = state.currentLots = action.payload.content;
            })
            .addCase(loadUserAllBets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentLots = state.currentLots = action.payload.content;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(buyLot.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(buyLot.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentLots = state.currentLots.filter((item) => {
                    return item.lot_id !== Number(action.payload);
                });
            })
            .addCase(buyLot.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(approveLot.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(approveLot.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(approveLot.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentLots = state.currentLots.filter((item) => {
                    return item.lot_id !== Number(action.payload);
                });
            })
            .addCase(rejectLot.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(rejectLot.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(rejectLot.fulfilled, (state, action) => {
                state.currentLots = state.currentLots.filter((item) => {
                    return item.lot_id !== Number(action.payload);
                });
                state.isLoading = false;
            })
            .addCase(confirmLot.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(confirmLot.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(confirmLot.fulfilled, (state, action) => {
                state.currentLots = state.currentLots.filter((item) => {
                    return item.lot_id !== Number(action.payload);
                });
                state.isLoading = false;
            })
            .addCase(deactivateLot.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(deactivateLot.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deactivateLot.fulfilled, (state, action) => {
                state.currentLots = state.currentLots.filter((item) => {
                    return item.lot_id !== Number(action.payload);
                });
                state.isLoading = false;
            });
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
    choseCheckbox,
    deleteOption,
    clearAllParameters,
    getDataFormated,
    toogleOpenModalVariety,
    toogleOpenModalRegions,
    sortBySelector,
    sendFiltersString,
    loadNewPage,
    getCurrentCategory,
    openModalBid,
} = filterSlice.actions;

export default filterSlice.reducer;

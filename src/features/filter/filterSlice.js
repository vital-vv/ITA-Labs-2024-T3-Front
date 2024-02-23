import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const applyFilters = createAsyncThunk(
  'filters/applyFilters',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const {
      sliderCurrentValues,
      valueOfQuantityCurrent,
      quantityValues,
      chosenOptions,
      sizeMeasuresToMm,
    } = getState().filter;
    if (!sizeMeasuresToMm) {
      sliderCurrentValues = sliderCurrentValues.map((item) => item * 10);
    }
    const stringOfRequest = {
      fromSize: sliderCurrentValues[0],
      toSize: sliderCurrentValues[1],
    };
    try {
      const response = await axios
        .get
        // 'http://ita-labs-2024-t3-730676977.us-east-1.elb.amazonaws.com/api/data-selection'
        ();
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      return response.data;
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

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    currentCategoryId: 0,
    sliderDefaultValues: { mm: [200, 600], cm: [5, 15] },
    minMaxSlider: { mm: [0, 1000], cm: [0, 20] },
    sizing: ['mm', 'cm'],
    sliderCurrentValues: [200, 600],
    sliderCurrentLimit: [0, 1000],
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
    apples: [
      { name: 'alwa', id: 1, isChecked: false },
      { name: 'antonowka', id: 2, isChecked: false },
      { name: 'boiken', id: 3, isChecked: false },
      { name: 'boskoop', id: 4, isChecked: false },
      { name: 'braeburn', id: 5, isChecked: false },
      { name: 'champion', id: 6, isChecked: false },
    ],
    packages: null,
    locations: [],
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
        state.apples,
        state.packages,
        state.locations,
        elementId
      );
      const sumArray = [...state.apples, ...state.packages, ...state.locations];
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
    },
    deleteOption(state, action) {
      const elementId = payloadToNumber(action.payload);
      state.chosenOptions = filterArray(state.chosenOptions, elementId);
      toggleElementsAllArrays(
        state.apples,
        state.packages,
        state.locations,
        elementId
      );
    },
    clearAllParameters(state, {}) {
      const sumArray = [...state.apples, ...state.packages, ...state.locations];
      sumArray.forEach((item) => {
        item.isChecked = false;
      });
      state.chosenOptions = [];
      state.sizeMeasuresToMm = true;
      state.sliderCurrentValues = [200, 600];
      (state.sliderCurrentLimit = [0, 1000]),
        (state.valueOfQuantityCurrent = 'ton');
      state.currentValute = 'USD';
      state.quantityValues = [1, 10000];
      state.sumCurrent = [1, 1000000];
      state.isOpenModalVariety = false;
      state.isOpenModalRegions = false;
    },
    getDataFormated(state, action) {
      state.packages = action.payload.packages;
      state.valuesOfValutes = action.payload.valutes;
      state.valuesOfQuantity = action.payload.quantity;
      state.locations = action.payload.countries.flatMap((item) =>
        item.regions.map((item, index) => ({
          name: item,
          id: index + 60,
          isChecked: false,
        }))
      );
    },
    toogleOpenModalVariety(state) {
      toogleModal(state, 'isOpenModalVariety');
    },
    toogleOpenModalRegions(state) {
      toogleModal(state, 'isOpenModalRegions');
    },
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
} = filterSlice.actions;

export default filterSlice.reducer;

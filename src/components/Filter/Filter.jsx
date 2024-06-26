import classes from './Filter.module.scss';
import ElementForFilter from '../ElementForFilter/ElementForFilter';
import RSlider from '../Slider/Slider';
import NumberInput from '../NumberInput/NumberInput';
import LabelForFilter from '../LabelForFilter/LabelForFilter';
import MoreFilter from '../MoreFilter/MoreFilter';
import FilterSizing from '../FilterSizing/FilterSizing';
import Buttonfilter from '../ButtonFilter/ButtonFilter';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSliderByKeysFrom,
  changeSliderByKeysUntil,
  toggleMeasures,
  toggleMeasuresQuantity,
  changeInputQuantityFrom,
  changeInputQuantityUntil,
  changeMeasuresValutes,
  changeInputSumFrom,
  changeInputSumUntil,
  changeSliderValues,
  toogleOpenModalVariety,
  toogleOpenModalRegions,
  loadNewPage,
  getDataFormated,
  getCurrentCategory,
} from '../../features/filter/filterSlice';
import { useMemo, useEffect, useState } from 'react';
import { getRegionsCurrentCountry } from '../../features/main/mainSlice';
import Loader from '../../hoc/Loader/Loader';
import { useLocation } from 'react-router-dom';
import { getSubcategories } from '../../features/categories/subcategoriesSlice.js';
import { resetState } from '../../features/lots/lotsSlice.js';

const Filter = () => {
  const fillContainer = (array) => {
    return array.map((item) => (
      <ElementForFilter
        name={item.name}
        key={uuidv4()}
        id={item.id}
        isChecked={item.isChecked}
        categoryName={item.categoryName}
      />
    ));
  };

  const dispatch = useDispatch();
  const { currency, quantity, countries, packaging, regions, isDataReady } =
    useSelector((state) => state.main);

  const lengthUnits = useSelector((state) => state.main.sizing);
  const subcategories = useSelector((state) => state.subcategories.list);
  const { isSubcategoriesReady } = useSelector((state) => state.subcategories);
  const location = useLocation();
  const paramId = location.search.substring(4);
  let category = location.pathname.split('/');
  category = category[category.length - 1];
  category = category.charAt(0).toUpperCase() + category.slice(1);
  const { currencyThisSession } = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(getCurrentCategory({ id: paramId, category: category }));
    dispatch(getSubcategories(paramId));
    dispatch(getRegionsCurrentCountry('Belarus'));
    return () => dispatch(resetState());
  }, [dispatch, paramId]);

  useEffect(() => {
    if (isDataReady && isSubcategoriesReady && regions) {
      dispatch(
        getDataFormated({
          packages: packaging,
          valutes: currency,
          quantity: quantity,
          regions: regions,
          lengthUnits: lengthUnits,
          subcategories: subcategories,
          currencyThisSession: currencyThisSession,
        })
      );
    }
  }, [
    dispatch,
    packaging,
    countries,
    regions,
    isSubcategoriesReady,
    isDataReady,
    subcategories,
    currencyThisSession,
  ]);

  const {
    sliderCurrentLimit,
    quantityValues: [fromQuantity, untilQuantity],
    isValidFormSizing: [isValidFrom, isValidUntil],
    sizeMeasuresToMm,
    sliderCurrentValues,
    valueOfQuantityCurrent,
    isValidFormQuantity: [isValidFromQuantity, isValidUntilQuantity],
    currentValute,
    sumCurrent: [currentSumFrom, currentSumUntil],
    isValidFormSum: [isValidFromSum, isValidUntilSum],
    varieties,
    packages,
    locations,
    sizing,
    isOpenModalVariety,
    isOpenModalRegions,
    allDataFilterReady,
  } = useSelector((state) => state.filter);

  const createInputChangeHandler = (actionCreator) => {
    return useMemo(
      () => (event) => {
        dispatch(actionCreator(event.target.value));
      },
      [dispatch]
    );
  };

  const createToggleHandler = (actionCreator) => {
    return useMemo(
      () => (event) => {
        dispatch(actionCreator(event.target.id));
      },
      [dispatch]
    );
  };

  const handleChangeFrom = createInputChangeHandler(changeSliderByKeysFrom);
  const handleChangeUntil = createInputChangeHandler(changeSliderByKeysUntil);
  const handleChangeFromQuantity = createInputChangeHandler(
    changeInputQuantityFrom
  );
  const handleChangeUntilQuantity = createInputChangeHandler(
    changeInputQuantityUntil
  );
  const handleChangeFromSum = createInputChangeHandler(changeInputSumFrom);
  const handleChangeUntilSum = createInputChangeHandler(changeInputSumUntil);
  const handleToggleMeasures = createToggleHandler(toggleMeasures);
  const handleToggleMeasuresQuantity = createToggleHandler(
    toggleMeasuresQuantity
  );
  const handleToggleValutes = createToggleHandler(changeMeasuresValutes);

  const handleChangeSlider = (event, newValue) =>
    dispatch(changeSliderValues({ newValue }));

  const handleChangeOpenModalVariety = () => {
    dispatch(toogleOpenModalVariety());
  };

  const handleChangeOpenModalRegions = () => {
    dispatch(toogleOpenModalRegions());
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight;
    if (isBottom) {
      dispatch(loadNewPage());
    }
  };

  let fillSelector;
  if (countries) {
    fillSelector = countries.map((country) => {
      return <option value={country.name} label={country.name}></option>;
    });
  }

  const handleLoadRegions = (event) => {
    dispatch(getRegionsCurrentCountry(event.target.value));
    setSelectorCountry(event.target.value);
  };

  const [selectorCountry, setSelectorCountry] = useState('Belarus');

  return (
    <>
      {allDataFilterReady ? (
        <div>
          <div className={classes.filter}>
            <div>
              <LabelForFilter name={'Variety'} />
              {fillContainer(varieties)}
              <MoreFilter
                options={varieties.length}
                isOpenModal={isOpenModalVariety}
                setOpenModal={handleChangeOpenModalVariety}
                arrayForShowModal={varieties}
              />
            </div>
            <FilterSizing
              values={'Size, '}
              measures={sizing}
              toggleMeasures={handleToggleMeasures}
              quantityMeasure={sizeMeasuresToMm ? 'mm' : 'cm'}
            />
            <RSlider
              min={sliderCurrentLimit[0]}
              max={sliderCurrentLimit[1]}
              currentValue={sliderCurrentValues}
              changeSlider={handleChangeSlider}
            />
            <NumberInput
              from={sliderCurrentValues[0]}
              until={sliderCurrentValues[1]}
              changeFrom={handleChangeFrom}
              changeUntil={handleChangeUntil}
              isValidFrom={isValidFrom}
              isValidUntil={isValidUntil}
            />
            <LabelForFilter name={'Packaging'} />
            {fillContainer(packages)}
            <LabelForFilter name={'Location'} />
            <select
              className={classes.country}
              onChange={handleLoadRegions}
              value={selectorCountry}
            >
              {fillSelector}
            </select>
            {fillContainer(locations)}
            <MoreFilter
              options={locations.length}
              isOpenModal={isOpenModalRegions}
              setOpenModal={handleChangeOpenModalRegions}
              arrayForShowModal={locations}
            />
            <FilterSizing
              values={`Quantity, ${valueOfQuantityCurrent}`}
              measures={quantity}
              toggleMeasures={handleToggleMeasuresQuantity}
            />
            <NumberInput
              from={fromQuantity}
              until={untilQuantity}
              isValidFrom={isValidFromQuantity}
              isValidUntil={isValidUntilQuantity}
              changeFrom={handleChangeFromQuantity}
              changeUntil={handleChangeUntilQuantity}
            />
            <FilterSizing
              values={`Price, ${currentValute}`}
              measures={currency}
              toggleMeasures={handleToggleValutes}
            />
            <NumberInput
              from={currentSumFrom}
              until={currentSumUntil}
              isValidFrom={isValidFromSum}
              isValidUntil={isValidUntilSum}
              changeFrom={handleChangeFromSum}
              changeUntil={handleChangeUntilSum}
            />
          </div>
          <div className={classes.filterUse}>
            <Buttonfilter />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Filter;

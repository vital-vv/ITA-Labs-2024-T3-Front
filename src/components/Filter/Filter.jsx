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
} from '../../features/filter/filterSlice';
import { useMemo } from 'react';

const Filter = () => {
  const fillContainer = (array) => {
    return array.map((item) => (
      <ElementForFilter
        name={item.name}
        key={uuidv4()}
        id={item.id}
        isChecked={item.isChecked}
      />
    ));
  };

  const {
    sliderCurrentLimit,
    quantityValues: [fromQuantity, untilQuantity],
    isValidFormSizing: [isValidFrom, isValidUntil],
    sizeMeasuresToMm,
    sliderCurrentValues,
    valuesOfQuantity,
    valueOfQuantityCurrent,
    isValidFormQuantity: [isValidFromQuantity, isValidUntilQuantity],
    valuesOfValutes,
    currentValute,
    sumCurrent: [currentSumFrom, currentSumUntil],
    isValidFormSum: [isValidFromSum, isValidUntilSum],
    apples,
    packages,
    locations,
    sizing,
  } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

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

  return (
    <div>
      <div className={classes.filter}>
        <div>
          <LabelForFilter name={'Variety'} />
          {fillContainer(apples)}
          <MoreFilter options={33} />
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
        {fillContainer(locations)}
        <MoreFilter options={14} />
        <FilterSizing
          values={`Quantity, ${valueOfQuantityCurrent}`}
          measures={valuesOfQuantity}
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
          measures={valuesOfValutes}
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
  );
};

export default Filter;

import classes from './Filter.module.scss';
import ElementForFilter from '../ElementForFilter/ElementForFilter';
import RSlider from '../Slider/Slider';
import NumberInput from '../NumberInput/NumberInput';
import LabelForFilter from '../LabelForFilter/LabelForFilter';
import MoreFilter from '../MoreFilter/MoreFilter';
import FilterSizing from '../FilterSizing/FilterSizing';
import { sizing } from '../dataoffilter';
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
} from '../../features/filter/filterSlice';
import { useMemo } from 'react';

const Filter = () => {
  const fillContainer = (array) => {
    return array.map((item) => (
      <ElementForFilter name={item.name} key={uuidv4()} id={item.id}/>
    ));
  };

  const filterState = useSelector((state) => state.filter);

  const sliderCurrentLimit = filterState.sliderCurrentLimit;
  const [fromQuantity, untilQuantity] = filterState.quantityValues;
  const [isValidFrom, isValidUntil] = filterState.isValidFormSizing;
  const sizeMeasuresToMm = filterState.sizeMeasuresToMm;
  const sliderCurrentValues = filterState.sliderCurrentValues;
  const quantity = filterState.valuesOfQuantity;
  const currentQuantity = filterState.valueOfQuantityCurrent;
  const [isValidFromQuantity, isValidUntilQuantity] =
    filterState.isValidFormQuantity;
  const valutes = filterState.valuesOfValutes;
  const currentValute = filterState.currentValute;
  const [currentSumFrom, currentSumUntil] = filterState.sumCurrent;
  const [isValidFromSum, isValidUntilSum] = filterState.isValidFormSum;
  const apples = filterState.apples;
  const packages = filterState.packages;
  const locations = filterState.locations;
  const sizing = filterState.sizing;

  const dispatch = useDispatch();

  const handleChangeFrom = useMemo(
    () => (event) => {
      dispatch(changeSliderByKeysFrom(event.target.value));
    },
    [dispatch]
  );

  const handleChangeUntil = useMemo(
    () => (event) => {
      dispatch(changeSliderByKeysUntil(event.target.value));
    },
    [dispatch]
  );

  const handleToggleMeasures = useMemo(
    () => (event) => {
      dispatch(toggleMeasures(event.target.id));
    },
    [dispatch]
  );

  const handleToggleMeasuresQuantity = useMemo(
    () => (event) => {
      dispatch(toggleMeasuresQuantity(event.target.id));
    },
    [dispatch]
  );

  const handleChangeFromQuantity = useMemo(
    () => (event) => {
      dispatch(changeInputQuantityFrom(event.target.value));
    },
    [dispatch]
  );

  const handleChangeUntilQuantity = useMemo(
    () => (event) => {
      dispatch(changeInputQuantityUntil(event.target.value));
    },
    [dispatch]
  );

  const handleToggleValutes = useMemo(
    () => (event) => {
      dispatch(changeMeasuresValutes(event.target.id));
    },
    [dispatch]
  );

  const handleChangeFromSum = useMemo(
    () => (event) => {
      dispatch(changeInputSumFrom(event.target.value));
    },
    [dispatch]
  );

  const handleChangeUntilSum = useMemo(
    () => (event) => {
      dispatch(changeInputSumUntil(event.target.value));
    },
    [dispatch]
  );

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
          values={`Quantity, ${currentQuantity}`}
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
          measures={valutes}
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

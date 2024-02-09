import classes from './Filter.module.scss';
import ElementForFilter from '../ElementForFilter/ElementForFilter';
import RSlider from '../Slider/Slider';
import NumberInput from '../NumberInput/NumberInput';
import LabelForFilter from '../LabelForFilter/LabelForFilter';
import MoreFilter from '../MoreFilter/MoreFilter';
import FilterSizing from '../FilterSizing/FilterSizing';
import {
  apples,
  packages,
  locations,
  sizing,
  quantity,
  valutes,
} from '../dataoffilter';
import Buttonfilter from '../ButtonFilter/ButtonFilter';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSliderByKeysFrom,
  changeSliderByKeysUntil,
  toogleMeasures,
} from '../../features/filter/filterSlice';
import { useEffect, useState, useMemo } from 'react';

const Filter = () => {
  const fillContainer = (array) => {
    return array.map((item) => (
      <ElementForFilter name={item.name} key={uuidv4()} />
    ));
  };

  const filterState = useSelector(state => state.filter);

  const minMaxSliderMm = filterState.minMaxSlider.mm;
  const minMaxSliderCm = filterState.minMaxSlider.cm;
  const [fromQuantity, untilQuantity] = filterState.quantityDefaultValues;
  const [isValidFrom, isValidUntil] = filterState.isValidFormSizing
  const sizeMeasuresToMm = filterState.sizeMeasuresToMm
  const { mm, cm } = useMemo(() => filterState.sliderDefaultValues, [filterState]) 
  const [minMaxMeasure, setMinMaxMeasure] = useState(minMaxSliderMm);

  const [defaultValue, setDefaultValueSlider] = useState(mm);

  useEffect(() => {
    if (sizeMeasuresToMm) {
      setDefaultValueSlider(mm);
      setMinMaxMeasure(minMaxSliderMm);
    } else {
      setDefaultValueSlider(cm);
      setMinMaxMeasure(minMaxSliderCm);
    }
  }, [sizeMeasuresToMm, mm, cm]);

  const dispatch = useDispatch();

  
  const handleChangeFrom = useMemo(() => (event) => {
    dispatch(changeSliderByKeysFrom(event.target.value));
  }, [dispatch]);

  const handleChangeUntil = useMemo(() => (event) => {
    dispatch(changeSliderByKeysUntil(event.target.value));
  }, [dispatch]);

  const toggleMeasures = useMemo(() => (event) => {
    dispatch(toogleMeasures(event.target.id));
  }, [dispatch]);

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
          toogleMeasures={toggleMeasures}
          quantityMeasure={sizeMeasuresToMm ? 'mm' : 'cm'}
        />
        <RSlider
          min={minMaxMeasure[0]}
          max={minMaxMeasure[1]}
          currentValue={defaultValue}
        />
        <NumberInput
          from={defaultValue[0]}
          until={defaultValue[1]}
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
        <FilterSizing values={'Quantity, ton'} measures={quantity} />
        <NumberInput
          from={fromQuantity}
          until={untilQuantity}
          isValidFrom={true}
          isValidUntil={true}
        />
        <FilterSizing values={'Price, USD'} measures={valutes} />
        <NumberInput from={'from'} until={'to'} />
      </div>
      <div className={classes.filterUse}>
        <Buttonfilter />
      </div>
    </div>
  );
};

export default Filter;

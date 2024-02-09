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
import { changeSliderByKeysFrom, changeSliderByKeysUntil, toogleMeasures } from '../../features/filter/filterSlice';

const Filter = () => {
  const fillContainer = (array) => {
    return array.map((item) => <ElementForFilter name={item.name} key={uuidv4()}/>);
  };

  const measuresQuantity = useSelector(
    state => state.filter.sizeMeasuresToMm
  );
  const [fromSlider, untilSlider] = useSelector(
    state => state.filter.sliderDefaultValues
  );
  const [fromQuantity, untilQuantity] = useSelector(
    state => state.filter.quantityDefaultValues
  )
  const [isValidFrom, isValidUntil] = useSelector(
    state => state.filter.isValidFormSizing
  )

  const dispatch = useDispatch();

  const changeFrom = (event) => {
    dispatch(changeSliderByKeysFrom(event.target.value));
  };

  const changeUntil = (event) => {
    dispatch(changeSliderByKeysUntil(event.target.value));
  };

  const toogleMeasuresTo = (event) => {
    dispatch(toogleMeasures(event.target.id))
  }

  return (
    <div>
      <div className={classes.filter}>
        <div>
          <LabelForFilter name={'Variety'} />
          {fillContainer(apples)}
          <MoreFilter options={33} />
        </div>
        <FilterSizing values={'Size, '} measures={sizing} toogleMeasures={toogleMeasuresTo} quantityMeasure={measuresQuantity ? 'mm' : 'cm'}/>
        <RSlider min={0} max={1000}/>
        <NumberInput from={fromSlider} until={untilSlider} changeFrom={changeFrom} changeUntil={changeUntil} isValidFrom={isValidFrom} isValidUntil={isValidUntil}/>
        <LabelForFilter name={'Packaging'} />
        {fillContainer(packages)}
        <LabelForFilter name={'Location'} />
        {fillContainer(locations)}
        <MoreFilter options={14} />
        <FilterSizing values={'Quantity, ton'} measures={quantity} />
        <NumberInput from={fromQuantity} until={untilQuantity} isValidFrom={true} isValidUntil={true} />
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

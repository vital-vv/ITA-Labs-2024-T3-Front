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

const Filter = () => {
  const fillContainer = (array) => {
    return array.map((item) => <ElementForFilter name={item.name} key={uuidv4()}/>);
  };

  return (
    <div>
      <div className={classes.filter}>
        <div>
          <LabelForFilter name={'Variety'} />
          {fillContainer(apples)}
          <MoreFilter options={33} />
        </div>
        <FilterSizing values={'Size, mm'} measures={sizing} />
        <RSlider />
        <NumberInput />
        <LabelForFilter name={'Packaging'} />
        {fillContainer(packages)}
        <LabelForFilter name={'Location'} />
        {fillContainer(locations)}
        <MoreFilter options={14} />
        <FilterSizing values={'Quantity, ton'} measures={quantity} />
        <NumberInput from={1} until={1000} />
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

import classes from '../assets/styles/Filter.module.scss';
import ElementForFilter from './Elementforfilter';
import RSlider from './Slider';
import NumberInput from './Numberinput';
import LabelForFilter from './Labelforfilter';
import MoreFilter from './Morefilter';
import FilterSizing from './Filtersizing';
import {
  apples,
  packages,
  locations,
  sizing,
  quantity,
  valutes,
} from './dataoffilter';
import Buttonfilter from './Buttonfilter';
import { useState } from 'react';

const Filter = () => {
  const Fillcontainer = (array) => {
    return array.map((item) => <ElementForFilter name={item.name} />);
  };

  const [arrayValue, setArrayValue] = useState([]);

  const setArray = (array) => {
    setArrayValue(array);
  };

  return (
    <div>
      <div className={classes.filter}>
        <div>
          <LabelForFilter name={'Variety'} />
          {Fillcontainer(apples)}
          <MoreFilter options={33} />
        </div>
        <FilterSizing values={'Size, mm'} measures={sizing} />
        <RSlider setArray={setArray} />
        <NumberInput from={arrayValue[0]} until={arrayValue[1]} />
        <LabelForFilter name={'Packaging'} />
        {Fillcontainer(packages)}
        <LabelForFilter name={'Location'} />
        {Fillcontainer(locations)}
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

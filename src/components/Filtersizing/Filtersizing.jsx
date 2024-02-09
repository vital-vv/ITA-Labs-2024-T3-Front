import classes from './FilterSizing.module.scss';
import { v4 as uuidv4 } from 'uuid';

const FilterSizing = ({values, measures, toogleMeasures, quantityMeasure}) => {
  return (
    <div className={classes.sizing}>
      <p className={classes.labelOfSize}>{values}{quantityMeasure}</p>
      <p className={classes.changeSize}>
        {measures.map((item, index) => {
          return <span key={uuidv4()} id={index} onClick={toogleMeasures}>{item}</span>;
        })}
      </p>
    </div>
  );
};

export default FilterSizing;

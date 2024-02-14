import classes from './FilterSizing.module.scss';
import { v4 as uuidv4 } from 'uuid';

const FilterSizing = ({values, measures, toggleMeasures, quantityMeasure}) => {
  return (
    <div className={classes.sizing}>
      <p className={classes.labelOfSize}>{values}{quantityMeasure}</p>
      <p className={classes.changeSize}>
        {measures.map((item, index) => {
          return <span key={uuidv4()} id={index} onClick={toggleMeasures}>{item}</span>;
        })}
      </p>
    </div>
  );
};

export default FilterSizing;

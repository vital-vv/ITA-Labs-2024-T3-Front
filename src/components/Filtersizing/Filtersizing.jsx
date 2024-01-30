import classes from './FilterSizing.module.scss';
import { v4 as uuidv4 } from 'uuid';

const FilterSizing = (props) => {
  return (
    <div className={classes.sizing}>
      <p className={classes.labelOfSize}>{props.values}</p>
      <p className={classes.changeSize}>
        {props.measures.map((item) => {
          return <span key={uuidv4()}>{item}</span>;
        })}
      </p>
    </div>
  );
};

export default FilterSizing;

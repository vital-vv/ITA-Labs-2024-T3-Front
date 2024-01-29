import classes from './Filtersizing.module.scss';

const FilterSizing = (props) => {
  return (
    <div className={classes.sizing}>
      <p className={classes.labelOfSize}>{props.values}</p>
      <p className={classes.changeSize}>
        {props.measures.map((item) => {
          return <span>{item}</span>;
        })}
      </p>
    </div>
  );
};

export default FilterSizing;

import ArrowRight from '../../assets/svg/ArrowRight';
import classes from './MoreFilter.module.scss';

const MoreFilter = (props) => {
  return (
    <div className={classes.more}>
      <label>All {props.options} options</label>
      <button>
        <ArrowRight/>
      </button>
    </div>
  );
};

export default MoreFilter;

import { useSelector } from 'react-redux';
import Clock from '../../assets/svg/Clock';
import classes from './IdOfProduct.module.scss';

function IdOfProduct({currentValidity, currentId}) {
  const {fullValidationForm} = useSelector(state => state.lots)

  return (
    <p className={classes.data}>
      <p>
        <span>
          <Clock />
        </span>
        <span>{currentValidity} days</span>
      </p>
      <p className={fullValidationForm ? classes.hidden : null}>ID{currentId}</p>
    </p>
  );
}

export default IdOfProduct;

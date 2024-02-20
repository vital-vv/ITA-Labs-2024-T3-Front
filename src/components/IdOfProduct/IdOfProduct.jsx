import Clock from '../../assets/svg/Clock';
import classes from './IdOfProduct.module.scss';

function IdOfProduct({currentValidity}) {
  return (
    <p className={classes.data}>
      <p>
        <span>
          <Clock />
        </span>
        <span>{currentValidity} days</span>
      </p>
      <p>ID423-09325</p>
    </p>
  );
}

export default IdOfProduct;

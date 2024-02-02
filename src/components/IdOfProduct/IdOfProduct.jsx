import Clock from '../../assets/svg/Clock';
import classes from './IdOfProduct.module.scss';

function IdOfProduct() {
  return (
    <p className={classes.data}>
      <p>
        <span>
          <Clock />
        </span>
        <span>2d 23h</span>
      </p>
      <p>ID423-09325</p>
    </p>
  );
}

export default IdOfProduct;

import { useLocation } from 'react-router-dom';
import Clock from '../../assets/svg/Clock';
import classes from './IdOfProduct.module.scss';

function IdOfProduct({currentValidity, currentId}) {
  return (
    <p className={classes.data}>
      <p>
        <span>
          <Clock />
        </span>
        <span>{currentValidity} days</span>
      </p>
      <p>ID{currentId}</p>
    </p>
  );
}

export default IdOfProduct;

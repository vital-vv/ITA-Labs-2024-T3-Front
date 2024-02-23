import { NavLink } from 'react-router-dom';
import ill from '../../assets/images/ill.png';
import classes from './Success.module.scss';

function Success() {
  return (
    <div className={classes.success}>
      <div>
        <img src={ill} alt="success" />
        <p className={classes.label}>
          <p>Success!</p>
          <p>Your ad has been published</p>
        </p>
        <NavLink to={'/'}>
          <button>Okay</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Success;

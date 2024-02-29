import { NavLink } from 'react-router-dom';
import tomato from '../../assets/images/tomato.jpg';
import classes from './Failed.module.scss';

function Success() {
  return (
    <div className={classes.success}>
      <div>
        <img src={tomato} alt="failed" />
        <p className={classes.label}>
          <p>Failed!</p>
          <p>Something went wrong</p>
        </p>
        <NavLink to={'/'}>
          <button>To home page</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Success;
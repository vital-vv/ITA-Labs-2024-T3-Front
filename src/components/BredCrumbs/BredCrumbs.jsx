import { NavLink, useLocation } from 'react-router-dom';
import classes from './BredCrumbs.module.scss';

function BredCrumbs() {
  const location = useLocation();
  const quantityParams = location.pathname
    .slice(1, location.pathname.length)
    .split('/').length;
  let isLastStep = quantityParams === 2;

  return (
    <div className={classes.bredCrumbs}>
      <NavLink to={'/'}>
      <span className={classes.nextCategory}>Home</span>
      </NavLink>
      <span>&gt;</span>
      <NavLink to={'/lotslist'}>
        {/* to add parameters after full connect with frontend */}
      <span className={classes.nextCategory}>Apples</span>
      </NavLink>
      <span className={!isLastStep ? classes.hidden : null}>
        <span>&gt;</span>
        <span className={classes.nextCategory}>Apples</span>
      </span>
    </div>
  );
}

export default BredCrumbs;

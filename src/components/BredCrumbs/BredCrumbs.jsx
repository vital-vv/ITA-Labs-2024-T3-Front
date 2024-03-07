import { NavLink, useLocation } from 'react-router-dom';
import classes from './BredCrumbs.module.scss';
import { useSelector } from 'react-redux';

function BredCrumbs() {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }

  const location = useLocation();
  const quantityParams = location.pathname
    .slice(1, location.pathname.length)
    .split('/');
  let isLastStep = quantityParams.length === 3;
  quantityParams.pop();
  const findCategory = quantityParams[quantityParams.length-1];
  const lastStep = quantityParams.join('/');
  const {currentCategory, currentCategoryId} = useSelector(state => state.filter);
  const currentName = useSelector(state => state.lots.title);

  return (
    <div className={classes.bredCrumbs}>
      <NavLink to={'/'}>
      <span className={classes.nextCategory}>Home</span>
      </NavLink>
      <span>&gt;</span>
      <NavLink to={isLastStep ? `/${lastStep}?id=${currentCategoryId}` : null}>
      <span className={classes.nextCategory}>{currentCategory || capitalizeFirstLetter(findCategory)}</span>
      </NavLink>
      <span className={!isLastStep ? classes.hidden : null}>
        <span>&gt;</span>
        <span className={classes.nextCategory}>{currentName}</span>
      </span>
    </div>
  );
}

export default BredCrumbs;

import { NavLink } from 'react-router-dom';
import ChoseOptions from '../ChoseOptions/ChoseOptions';
import Goods from '../Goods/Goods';
import { ROUTES } from '../../utils/routes';

const MainLotsList = () => {
  return (
    <div>
      <ChoseOptions />
      <NavLink to={ROUTES.LOTVIEW}>
        <Goods />
      </NavLink>
      <NavLink to={ROUTES.LOTVIEW}>
        <Goods />
      </NavLink>
      <NavLink to={ROUTES.LOTVIEW}>
        <Goods />
      </NavLink>
      <NavLink to={ROUTES.LOTVIEW}>
        <Goods />
      </NavLink>
      <NavLink to={ROUTES.LOTVIEW}>
        <Goods />
      </NavLink>
    </div>
  );
};

export default MainLotsList;

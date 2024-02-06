import { NavLink } from 'react-router-dom';
import ChoseOptions from '../ChoseOptions/ChoseOptions';
import Goods from '../Goods/Goods';
import { ROUTES } from '../../utils/routes';

const MainLotsList = () => {

  const items = Array.from({ length: 5 }, (_, index) => (
    <NavLink key={index} to={ROUTES.LOTVIEW}>
      <Goods />
    </NavLink>
  ));

  return (
    <div>
      <ChoseOptions />
      {items}
    </div>
  );
};

export default MainLotsList;

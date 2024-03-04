import { NavLink, useLocation } from 'react-router-dom';
import ChoseOptions from '../ChoseOptions/ChoseOptions';
import Goods from '../Goods/Goods';
import { ROUTES } from '../../utils/routes';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInDays, differenceInHours } from 'date-fns';
import classes from './MainLotsList.module.scss';
import { getOneLot } from '../../features/lots/lotsSlice';

const MainLotsList = () => {
  const { currentLots } = useSelector((state) => state.filter);
  const now = new Date();
  const location = useLocation();

  let lots = currentLots.map((lot, index) => {
    const targetDate = new Date(lot.expiration_date);
    const date = new Date(lot.created_at).toLocaleString();
    const differenceDays = differenceInDays(targetDate, now);
    const differenceHours = differenceInHours(targetDate, now) % 24;
    return (
      <NavLink
        key={index}
        to={`${location.pathname}/${lot.lot_id}`}
        id={lot.lot_id}
      >
        <Goods
          lotItem={lot}
          dateCreated={date}
          daysRest={differenceDays}
          hoursRest={differenceHours}
        />
      </NavLink>
    );
  });

  return (
    <div className={classes.mainLotsList}>
      <ChoseOptions />
      {lots.length ? (
        lots
      ) : (
        <img src="https://i.pinimg.com/originals/40/fd/d2/40fdd2c61203798836ab2c55583726aa.png"></img>
      )}
    </div>
  );
};

export default MainLotsList;

import { NavLink } from 'react-router-dom';
import ChoseOptions from '../ChoseOptions/ChoseOptions';
import Goods from '../Goods/Goods';
import { ROUTES } from '../../utils/routes';
import { useSelector } from 'react-redux';
import { differenceInDays, differenceInHours } from 'date-fns';
import classes from './MainLotsList.module.scss'

const MainLotsList = () => {
  const { currentLots } = useSelector((state) => state.filter);
  const now = new Date();
  

  let lots = currentLots.map((lot, index) => {
    const targetDate = new Date(lot.expiration_date)
    const date = new Date(lot.created_at).toLocaleString();
    const differenceDays = differenceInDays(targetDate, now);
    const differenceHours = differenceInHours(targetDate, now) % 24;
    return (
      <NavLink key={index} to={ROUTES.LOTVIEW}>
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
      {lots.length ? lots : <img src='https://i.pinimg.com/originals/40/fd/d2/40fdd2c61203798836ab2c55583726aa.png'></img>}
    </div>
  );
};

export default MainLotsList;

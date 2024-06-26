import { NavLink, useLocation } from 'react-router-dom';
import Goods from '../Goods/Goods';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInDays, differenceInHours } from 'date-fns';
import classes from './MainLotsList.module.scss';
import { deleteLot, applyFilters } from '../../features/filter/filterSlice';
import { useEffect } from 'react';
import { selectUserData } from '../../features/currentUser/currentUserSlice.js';

const MainLotsList = () => {
  const { currentLots } = useSelector((state) => state.filter);
  const userRole = useSelector(selectUserData).userData.role;
  const now = new Date();
  const location = useLocation();
  const dispatch = useDispatch();
  const { stringFilter, sortField, currentPage } = useSelector(
    (state) => state.filter
  );
  const { leadBet } = useSelector((state) => state.lots);
  const paramId = location.search.substring(4);

  const handleDeleteLot = (event) => {
    dispatch(deleteLot(event.currentTarget.id));
  };

  const { currencyThisSession } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, stringFilter, sortField, currentPage, paramId, leadBet, currencyThisSession]);

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
          id={lot.lot_id}
          lotItem={lot}
          dateCreated={date}
          daysRest={differenceDays}
          hoursRest={differenceHours}
          buttonDelete={handleDeleteLot}
          userRole={userRole}
        />
      </NavLink>
    );
  });

  return (
    <div className={classes.mainLotsList}>
      {lots.length ? (
        lots
      ) : (
        <img src="https://i.pinimg.com/originals/40/fd/d2/40fdd2c61203798836ab2c55583726aa.png"></img>
      )}
    </div>
  );
};

export default MainLotsList;

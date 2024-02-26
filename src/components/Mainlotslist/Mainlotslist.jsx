import { NavLink } from 'react-router-dom';
import ChoseOptions from '../ChoseOptions/ChoseOptions';
import Goods from '../Goods/Goods';
import { ROUTES } from '../../utils/routes';
import { useSelector } from 'react-redux';
import { differenceInDays, differenceInHours } from 'date-fns';

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
          title={lot.title}
          id={lot.lot_id}
          category={lot.category_name}
          variety={lot.variety}
          quantity={lot.quantity}
          size={lot.size}
          packaging={lot.packaging}
          country={lot.location.country}
          region={lot.location.region}
          dateCreated={date}
          daysRest={differenceDays}
          hoursRest={differenceHours}
        />
      </NavLink>
    );
  });

  return (
    <div>
      <ChoseOptions />
      {lots.length ? lots : <h1>Nothing was found</h1>}
    </div>
  );
};

export default MainLotsList;

import classes from './Goods.module.scss';
import Clock from '../../assets/svg/Clock';
import { ModalWindow } from './ModalWindow/ModalWindow.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeModalThrough } from '../../features/lots/lotsSlice.js';
import { LotButtons } from './LotButtons/LotButtons.jsx';
import { openModalBid } from '../../features/filter/filterSlice.js';

function Goods({
  lotItem,
  dateCreated,
  daysRest,
  hoursRest,
  buttonDelete,
  id,
  userRole,
}) {
  // const [open, setOpen] = useState(false);
  // const [minValue, setMinValue] = useState(0);
  // const [maxValue, setMaxValue] = useState(0);
  const dispatch = useDispatch();

  // const toggleModal = (event) => {
  //   setOpen((prevOpen) => !prevOpen);
  //   if (lotItem.leading) {
  //     setMinValue(lotItem.leading.amount + 1);
  //   } else {
  //     setMinValue(lotItem.start_price);
  //   }
  //   setMaxValue(lotItem.total_price - 1);
  //   dispatch(changeModalThrough(event.target.id));
  // };

  return (
    <>
      <div className={classes.goods}>
        <div className={classes.picture}>
          <img src={lotItem.image_url[0].url} alt="Photo of goods" />
        </div>
        <div className={classes.info}>
          <div>
            <p className={classes.labelOfGood}>{lotItem.title}</p>
            <p className={classes.data}>
              <p>
                <span>
                  <Clock />
                </span>
                <span>
                  {daysRest}d {hoursRest}h
                </span>
              </p>
              <p>ID{id}</p>
            </p>
          </div>
          <div className={classes.more}>
            <p className={classes.description}>
            {`${lotItem.title}, ${lotItem.category_name}, ${lotItem.quantity} ton, ${lotItem.size} mm, ${lotItem.packaging}`}
            </p>
            <p className={classes.region}>
              {lotItem.location.country}, {lotItem.location.region}
            </p>
            <p className={classes.dataOfAd}>{dateCreated}</p>
          </div>
        </div>
        <div className={classes.bet}>
          <div>
            <div className={classes.cost}>
              <p className={!lotItem.leading ? classes.grey : null}>
                {lotItem.leading ? `$${lotItem.leading.amount}` : 'No bets'}
              </p>
              <p className={!lotItem.leading ? classes.hidden : null}>
                $
                <span>
                  {lotItem.leading &&
                    (lotItem.leading.amount / lotItem.quantity).toFixed(2)}
                </span>
                /kg
              </p>
            </div>
            <div className={classes.perKg}>
              <p>${lotItem.total_price}</p>
              <p>
                <span>${lotItem.price_per_unit.toFixed(2)}</span>/
                {lotItem.weight}
              </p>
            </div>
          </div>
          <div
            className={classes.purchasing}
            onClick={(event) => event.preventDefault()}
          >
            <LotButtons
              userRole={userRole}
              id={id}
              title={lotItem.title}
              buttonDelete={buttonDelete}
              lotItem={lotItem}
            />{' '}
          </div>
        </div>
      </div>
      {/* <ModalWindow
        open={open}
        handleClose={toggleModal}
        minValue={minValue}
        maxValue={maxValue}
      /> */}
    </>
  );
}

export default Goods;

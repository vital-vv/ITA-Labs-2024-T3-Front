import classes from './Goods.module.scss';
import photo from '../../assets/images/apples.png';
import Clock from '../../assets/svg/Clock';
import Hammer from '../../assets/svg/Hammer';
import Cart from '../../assets/svg/Cart';
import Trash from '../../assets/svg/Trash';
import { ModalWindow } from './ModalWindow/ModalWindow.jsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeModalThrough } from '../../features/lots/lotsSlice.js';

function Goods({
  lotItem,
  dateCreated,
  daysRest,
  hoursRest,
  buttonDelete,
  id,
}) {
  const [open, setOpen] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const dispatch = useDispatch();

  

  const toggleModal = (event) => {
    setOpen((prevOpen) => !prevOpen);
    if (lotItem.leading) {
      setMinValue(lotItem.leading.amount + 1);
    } else {
      setMinValue(1);
    }
    setMaxValue(lotItem.price_per_unit*lotItem.quantity - 1);
    dispatch(changeModalThrough(event.target.id));
  };


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
                $<span>{lotItem.leading && (lotItem.leading.amount/lotItem.quantity).toFixed(2)}</span>/kg
              </p>
            </div>
            <div className={classes.perKg}>
              {/* Still hardcode */}
              <p>${lotItem.total_price}</p>
              <p>
                <span>${lotItem.price_per_unit.toFixed(2)}</span>/{lotItem.weight}
              </p>
            </div>
          </div>
          <div
            className={classes.purchasing}
            onClick={(event) => event.preventDefault()}
          >
            <button onClick={toggleModal} id={id}>
              <Hammer />
              My bet
            </button>
            <button>
              <Cart />
              Buy now
            </button>
            <button onClick={buttonDelete} id={id}>
              <Trash />
            </button>
          </div>
        </div>
      </div>
      <ModalWindow open={open} handleClose={toggleModal} minValue={minValue} maxValue={maxValue}/>
    </>
  );
}

export default Goods;

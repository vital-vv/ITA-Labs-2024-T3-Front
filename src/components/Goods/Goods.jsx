import classes from './Goods.module.scss';
import Clock from '../../assets/svg/Clock';
import { LotButtons } from './LotButtons/LotButtons.jsx';


function Goods({
  lotItem,
  dateCreated,
  daysRest,
  hoursRest,
  buttonDelete,
  id,
  userRole,
}) {
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
    </>
  );
}

export default Goods;

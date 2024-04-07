import classes from './Goods.module.scss';
import Clock from '../../assets/svg/Clock';
import {LotButtonsOld} from './LotButtons/LotButtonsOld.jsx';
import {useSelector} from 'react-redux';
import {useLocation} from "react-router-dom";
import {selectUserData} from "../../features/currentUser/currentUserSlice.js";
import {ManageLot} from "./ManageLot/ManageLot.jsx";
import {LotButtons} from "./LotButtons/LotButtons.jsx";
import Item from '../../assets/images/item.png';

function Goods({

  lotItem,
  dateCreated,
  daysRest,
  hoursRest,
  buttonDelete,
  id,
  userRole,
}) {
  const {userData} = useSelector(state => state.currentUser);
  const currentTabName = useSelector(selectUserData);
  const isProductOwner = lotItem.created_by === userData.user_id;
  const location = useLocation().pathname;
  
  return (
    <>
      <div className={classes.goods}>
        <div className={classes.picture}>
          <img src={lotItem.image_url[0] ? lotItem.image_url[0].url : "https://zm61.ru/upload/iblock/84b/srjklt20apje627nhctsvp8voy5oxppg.jpg"} alt="Photo of goods" />
        </div>
        <div className={classes.info}>
         <div>
                        <div className={classes.labelOfGood}><p>{lotItem.title}</p>
                            {currentTabName.currentTab === 'Pending' && <ManageLot lotStatus={lotItem.status} lotId={lotItem.lot_id}/>}
                        </div>
                        <div className={classes.data}>
                            <p>
                                {daysRest ? <><span><Clock/></span>
                                    <span>{daysRest}d {hoursRest}h</span>
                                </> : <div>{lotItem.description}</div>}
                                </p>
                            <p>ID {id || lotItem.request_id}</p>
                        </div>
                    </div>
          <div className={classes.more}>
            <p className={classes.description}>
              {`${lotItem.title}, ${lotItem.category_name}, ${lotItem.quantity} ton, ${lotItem.fromSize}-${lotItem.toSize} mm, ${lotItem.packaging}`}
            </p>
            <p className={classes.region}>
              {lotItem.location.country}, {lotItem.location.region}
            </p>
             <p className={classes.dataOfAd}>{dateCreated !== 'Invalid Date' ? dateCreated : null}</p>
          </div>
        </div>
        <div className={classes.bet}>
          <div className={classes.betInfo}>
            <div className={classes.cost}>
              <p className={!lotItem.leading ? classes.grey : null}>
                {lotItem.leading ? `${lotItem.leading.amount.toFixed(2)} ${lotItem.currency}` : 'No bets'}
              </p>
              <p className={!lotItem.leading ? classes.hidden : null}>
                {`${lotItem.currency} `}
                <span>

                  {lotItem.leading &&
                      (lotItem.leading.amount / lotItem.quantity).toFixed(2)}
                </span>

                /{lotItem.weight}
              </p>
            </div>
            <div className={classes.perKg}>
              <p>{lotItem.total_price} {lotItem.currency}</p>
              <p>
                <span>{lotItem.currency} {lotItem.price_per_unit.toFixed(2)}</span>/
                {lotItem.weight}
              </p>
              </div>
                    </div>
                    <div
                        className={isProductOwner && !location.startsWith('/user/') ? classes.hidden : classes.purchasing}
                        onClick={(event) => event.preventDefault()}
                    >
                        <LotButtonsOld
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

import classes from './Description.module.scss';
import IdOfProduct from '../IdOfProduct/IdOfProduct';
import InfoIcon from '../../assets/svg/InfoIcon';
import Cart from '../../assets/svg/Cart';
import HammerGray from '../../assets/svg/HammerGray';
import Trash from '../../assets/svg/Trash';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  getOneLot,
  resetState,
  addNewBid,
  changeNewBidValidationAfterTime,
  confirmBid,
} from '../../features/lots/lotsSlice';
import { deleteLot } from '../../features/filter/filterSlice';
import { useValidationTimer } from '../../hook/useValidationAfterTime';

function Description() {
  const {
    currentRegion,
    currentCountry,
    title,
    currentWeight,
    currentPrice,
    currentVariety,
    sliderCurrent,
    currentWeightMeasure,
    currentPackages,
    currentValidity,
    currentMeasure,
    description,
    fullValidationForm,
    expirationDate,
    createdDate,
    isValidBid,
    currentBid,
    leadBet,
    correctRangeBets,
    minimalBet,
    createdByUser,
  } = useSelector((state) => state.lots);
  const { userData, currencyThisSession } = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();
  const location = useLocation();
  const currentId = +location.pathname.split('/').pop();
  const positionLastSlash = location.pathname.lastIndexOf('/');
  const stepBack = location.pathname.substring(0, positionLastSlash);
  const { currentCategoryId } = useSelector((state) => state.filter);
  const checkProductOwner = createdByUser === userData.user_id;
  const isNotUser = userData.role !== 'USER';
  

  if (!isNaN(currentId)) {
    useEffect(() => {
      dispatch(getOneLot({id: currentId, currency:currencyThisSession}));
      return () => {
        dispatch(resetState());
      };
    }, [dispatch, currentId, currencyThisSession]);
  }

  const date = new Date();
  const createDateLocal = new Date(createdDate);
  const targetDate = new Date(expirationDate);
  const differenceDays = differenceInDays(targetDate, date);

  const handleDeleleLot = (event) => {
    dispatch(deleteLot(event.currentTarget.id));
  };

  const handleNewBid = (event) => {
    dispatch(addNewBid(event.target.value));
  };

  useValidationTimer(
    isValidBid,
    dispatch,
    changeNewBidValidationAfterTime,
    currentBid
  );

  const handleAddBid = () => {
    const bidData = {
      lot_id: currentId,
      amount: currentBid,
      currency: currencyThisSession,
    };
    dispatch(confirmBid(bidData));
  };

  return (
    <div className={classes.description}>
      <div className={classes.wrapperPurchasing}>
        <p className={classes.labelOfDescription}>{title}</p>
        <IdOfProduct
          currentValidity={
            fullValidationForm ? currentValidity : differenceDays
          }
          currentId={currentId}
        />
        <div className={classes.shortInfo}>
          <div>
            <InfoIcon />
          </div>
          {description}
        </div>
      </div>
      <div className={classes.betBlock}>
        <div>
          <div className={classes.pricing}>
            <p className={fullValidationForm ? classes.noneVisibility : null}>
              Bet
            </p>
            <p>Total price</p>
          </div>
          <div className={classes.cost}>
            <p className={fullValidationForm || !leadBet ? classes.gray : null}>
              {leadBet
                ? `${leadBet.toFixed(2)} ${currencyThisSession}`
                : 'No bets'}
            </p>
            <p>{`${currentPrice} ${currencyThisSession}`}</p>
          </div>
          <div className={classes.costKg}>
            <p className={fullValidationForm ? classes.noneVisibility : null}>
              {(leadBet / currentWeight).toFixed(2)}{' '}
              {currencyThisSession} / {currentWeightMeasure}
            </p>
            <p>
              {(currentPrice / currentWeight).toFixed(2)}{' '}
              {currencyThisSession} per {currentWeightMeasure}
            </p>
          </div>
        </div>
        <div
          className={
            fullValidationForm || checkProductOwner || isNotUser
              ? classes.hidden
              : classes.offerSum
          }
        >
          <div>
            <span>{currencyThisSession}</span>
            <input
              type="text"
              placeholder="Enter your bet here"
              onChange={handleNewBid}
              className={isValidBid ? null : classes.notValid}
              value={currentBid}
            />
          </div>
          <p className={classes.comment}>
            Bet from {currencyThisSession}{' '}
            {leadBet ? leadBet + 1 : minimalBet} to{' '}
            {currencyThisSession} {currentPrice - 1}
          </p>
          <p>
            {(currentBid / currentWeight).toFixed(2)}{' '}
            {currencyThisSession} / {currentWeightMeasure}
          </p>
        </div>
        <div
          className={
            fullValidationForm || checkProductOwner || isNotUser
              ? classes.hidden
              : classes.buttonManage
          }
        >
          <button
            disabled={currentBid && correctRangeBets ? null : true}
            className={
              currentBid && correctRangeBets ? classes.valid : classes.hammer
            }
            onClick={handleAddBid}
          >
            <HammerGray />
            Bet
          </button>
          <button>
            <Cart />
            Buy for ${currentPrice}
          </button>
          <NavLink to={`${stepBack}?id=${currentCategoryId}`}>
            <button onClick={handleDeleleLot} id={currentId}>
              <Trash />
              Delete
            </button>
          </NavLink>
        </div>
      </div>
      <div className={classes.tableOfInfo}>
        <div>
          <p>Variety</p>
          <p>{currentVariety}</p>
        </div>
        <div>
          <p>Quantity</p>
          <p>{`${currentWeight} ${currentWeightMeasure}`}</p>
        </div>
        <div>
          <p>Size</p>
          <p>{`${sliderCurrent[0]} - ${sliderCurrent[1]} ${currentMeasure}`}</p>
        </div>
        <div>
          <p>Packaging</p>
          <p>{currentPackages}</p>
        </div>
        <div>
          <p>Location</p>
          <p>{`${currentCountry}, ${currentRegion}`}</p>
        </div>
        <div>
          <p>Created</p>
          <p>
            {fullValidationForm
              ? date.toLocaleString()
              : createDateLocal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;

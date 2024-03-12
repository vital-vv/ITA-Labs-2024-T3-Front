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
    currentPricingMeasure,
    description,
    fullValidationForm,
    expirationDate,
    createdDate,
    isValidBid,
    currentBid,
  } = useSelector((state) => state.lots);

  const dispatch = useDispatch();
  const location = useLocation();
  const currentId = +location.pathname.split('/').pop();
  const positionLastSlash = location.pathname.lastIndexOf('/');
  const stepBack = location.pathname.substring(0, positionLastSlash);
  const { currentCategoryId } = useSelector((state) => state.filter);

  if (!isNaN(currentId)) {
    useEffect(() => {
      dispatch(getOneLot(currentId));
      return () => {
        dispatch(resetState());
      };
    }, [dispatch, currentId]);
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
      user_id: 1, //Still HARDCODE!!!
      lot_id: currentId,
      amount: currentBid,
      currency: 'USD', //Still HARDCODE!!!, send preferred currency
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
            <p className={fullValidationForm ? classes.hidden : null}>Bet</p>
            <p>Total price</p>
          </div>
          <div className={classes.cost}>
            <p className={fullValidationForm ? classes.gray : null}>No bets</p>
            <p>{`${currentPrice} ${currentPricingMeasure}`}</p>
          </div>
          <div className={classes.costKg}>
            <p className={fullValidationForm ? classes.noneVisibility : null}>
              1.1/kg
            </p>
            <p>
              {(currentPrice / currentWeight).toFixed(2)}{' '}
              {currentPricingMeasure} per {currentWeightMeasure}
            </p>
          </div>
        </div>
        <div className={fullValidationForm ? classes.hidden : classes.offerSum}>
          <div>
            <span>$</span>
            <input
              type="text"
              placeholder="Enter your bet here"
              onChange={handleNewBid}
              className={isValidBid ? null : classes.notValid}
              value={currentBid}
            />
          </div>
          <p className={classes.comment}>Bet from $11,001 to $11,999</p>
          <p>$-/kg</p>
        </div>
        <div
          className={fullValidationForm ? classes.hidden : classes.buttonManage}
        >
          <button
            disabled={currentBid ? null : true}
            className={currentBid ? classes.valid : classes.hammer}
            onClick={handleAddBid}
          >
            <HammerGray />
            Bet
          </button>
          <button>
            <Cart />
            Buy for $12,000
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

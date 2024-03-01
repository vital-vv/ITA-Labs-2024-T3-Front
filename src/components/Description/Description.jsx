import classes from './Description.module.scss';
import IdOfProduct from '../IdOfProduct/IdOfProduct';
import InfoIcon from '../../assets/svg/InfoIcon';
import Cart from '../../assets/svg/Cart';
import HammerGray from '../../assets/svg/HammerGray';
import Trash from '../../assets/svg/Trash';
import { useSelector } from 'react-redux';
import OneStepBack from '../OneStepBack/OneStepBack';

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
  } = useSelector((state) => state.lots);

  const date = new Date();

  return (
    <div className={classes.description}>
      <OneStepBack/>
      <div className={classes.wrapperPurchasing}>
        <p className={classes.labelOfDescription}>{title}</p>
        <IdOfProduct currentValidity={currentValidity}/>
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
            <p className={fullValidationForm ? classes.noneVisibility : null}>1.1/kg</p>
            <p>{(currentPrice/currentWeight).toFixed(2)} {currentPricingMeasure} per {currentWeightMeasure}</p>
          </div>
        </div>
        <div className={fullValidationForm ? classes.hidden : classes.offerSum}>
          <div>
            <span>$</span>
            <span>
              <input type="text" placeholder="Enter your bet here" />
            </span>
          </div>
          <p className={classes.comment}>Bet from $11,001 to $11,999</p>
          <p>$-/kg</p>
        </div>
        <div className={fullValidationForm ? classes.hidden : classes.buttonManage}>
          <button className={classes.hammer}>
            <HammerGray />
            Bet
          </button>
          <button>
            <Cart />
            Buy for $12,000
          </button>
          {/* This button won't render if it's user  */}
          <button>
            <Trash />
            Delete
          </button>
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
          <p>{date.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Description;

import classes from './Description.module.scss';
import IdOfProduct from '../IdOfProduct/IdOfProduct';
import InfoIcon from '../../assets/svg/InfoIcon';
import Cart from '../../assets/svg/Cart';
import HammerGray from '../../assets/svg/HammerGray';
import Trash from '../../assets/svg/Trash';
import { useSelector } from 'react-redux';

function Description() {
  const {
    currentRegion,
    currentCountry,
    currentCategory,
    currentSubcategory,
    title,
    currentWeight,
    currentPrice,
    currentVariety,
    sliderCurrent,
    currentWeightMeasure,
    currentPackages,
    currentValidity,
    currentMeasure
  } = useSelector((state) => state.lots);

  return (
    <div className={classes.description}>
      <div className={classes.wrapperPurchasing}>
        <p className={classes.labelOfDescription}>{title}</p>
        <IdOfProduct currentValidity={currentValidity}/>
        <div className={classes.shortInfo}>
          <div>
            <InfoIcon />
          </div>
          Apples from my farm in near Bukhara, delicious and sweet
        </div>
      </div>
      <div className={classes.betBlock}>
        <div>
          <div className={classes.pricing}>
            <p>Bet</p>
            <p>Total price</p>
          </div>
          <div className={classes.cost}>
            <p>$11,000.00</p>
            <p>{currentPrice}</p>
          </div>
          <div className={classes.costKg}>
            <p>1.1/kg</p>
            <p>1.2/kg</p>
          </div>
        </div>
        <div className={classes.offerSum}>
          <div>
            <span>$</span>
            <span>
              <input type="text" placeholder="Enter your bet here" />
            </span>
          </div>
          <p className={classes.comment}>Bet from $11,001 to $11,999</p>
          <p>$-/kg</p>
        </div>
        <div className={classes.buttonManage}>
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
          <p>25.06.2022 12:15</p>
        </div>
      </div>
    </div>
  );
}

export default Description;

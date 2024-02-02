import classes from './Description.module.scss';
import IdOfProduct from '../IdOfProduct/IdOfProduct';
import InfoIcon from '../../assets/svg/InfoIcon';
import Cart from '../../assets/svg/Cart';
import HammerGray from '../../assets/svg/HammerGray';
import Trash from '../../assets/svg/Trash';

function Description() {
  return (
    <div className={classes.description}>
      <div className={classes.wrapperPurchasing}>
        <p className={classes.labelOfDescription}>Apples from the farm</p>
        <IdOfProduct />
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
            <p>$12,000.00</p>
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
          <div className={classes.hammer}>
            <HammerGray />
            Bet
          </div>
          <div>
            <Cart />
            Buy for $12,000
          </div>
          {/* This button won't render if it's user  */}
          <div>
            <Trash />
            Delete
          </div>
        </div>
      </div>
      <div className={classes.tableOfInfo}>
        <div>
          <p>Variety</p>
          <p>idared</p>
        </div>
        <div>
          <p>Quantity</p>
          <p>10 ton</p>
        </div>
        <div>
          <p>Size</p>
          <p>70+</p>
        </div>
        <div>
          <p>Packaging</p>
          <p>bins</p>
        </div>
        <div>
          <p>Location</p>
          <p>Uzbekistan, Bukhara region</p>
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

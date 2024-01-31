import classes from './Goods.module.scss';
import photo from '../../assets/images/apples.png';
import Clock from '../../assets/svg/Clock';
import Hammer from '../../assets/svg/Hammer';
import Cart from '../../assets/svg/Cart';

function Goods() {
  return (
    <div className={classes.goods}>
      <div className={classes.picture}>
        <img src={photo} alt="Photo of goods" />
      </div>
      <div className={classes.info}>
        <div>
          <p className={classes.labelOfGood}>Apple idared</p>
          <p className={classes.data}>
            <p>
              <span>
                <Clock/>
              </span>
              <span>2d 23h</span>
            </p>
            <p>ID423-09325</p>
          </p>
        </div>
        <div className={classes.more}>
          <p className={classes.description}>
            Apple, idared, 10 ton, 70+, bins
          </p>
          <p className={classes.region}>Uzbekistan, Bukhara region</p>
          <p className={classes.dataOfAd}>25.06.2022, 12:15</p>
        </div>
      </div>
      <div className={classes.bet}>
        <div>
          <div className={classes.cost}>
            <p>$11,000.00</p>
            <p>$1.1/kg</p>
          </div>
          <div className={classes.perKg}>
            <p>$12,000.00</p>
            <p>$1.2/kg</p>
          </div>
        </div>
        <div className={classes.purchasing}>
          <div>
           <Hammer/>
            My bet
          </div>
          <div>
            <Cart/>
            Buy now
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goods;
import classes from './Goods.module.scss';
import photo from '../../assets/images/apples.png';
import Clock from '../../assets/svg/Clock';
import Hammer from '../../assets/svg/Hammer';
import Cart from '../../assets/svg/Cart';
import Trash from '../../assets/svg/Trash';
import {ModalWindow} from "./ModalWindow/ModalWindow.jsx";
import {useState} from "react";

function Goods({title, id, category, variety, quantity, size, packaging, country, region, dateCreated, daysRest, hoursRest}) {

    const [open, setOpen] = useState(false);
    const toggleModal = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const minValue = 1.1;
    const maxValue = 1.2;

    return (
        <>
            <div className={classes.goods}>
                <div className={classes.picture}>
                    <img src={photo} alt="Photo of goods"/>
                </div>
                <div className={classes.info}>
                    <div>
                        <p className={classes.labelOfGood}>{title}</p>
                        <p className={classes.data}>
                            <p>
              <span>
                <Clock/>
              </span>
                                <span>{daysRest}d {hoursRest}h</span>
                            </p>
                            <p>ID{id}</p>
                        </p>
                    </div>
                    <div className={classes.more}>
                        <p className={classes.description}>
                            {`${category}, ${variety}, ${quantity} ton, ${size} mm, ${packaging}`}
                        </p>
                        <p className={classes.region}>{country}, {region}</p>
                        <p className={classes.dataOfAd}>{dateCreated}</p>
                    </div>
                </div>
                <div className={classes.bet}>
                    <div>
                        <div className={classes.cost}>
                            <p>$11,000.00</p>
                            <p>$<span>{minValue}</span>/kg</p>
                        </div>
                        <div className={classes.perKg}>
                            <p>$12,000.00</p>
                            <p>$<span>{maxValue}</span>/kg</p>
                        </div>
                    </div>
                    <div className={classes.purchasing}>
                        <button onClick={toggleModal}>
                            <Hammer/>
                            My bet
                        </button>
                        <button>
                            <Cart/>
                            Buy now
                        </button>
                        <button>
                            <Trash/>
                        </button>
                    </div>
                </div>
            </div>
            <ModalWindow minValue={minValue} maxValue={maxValue} open={open} handleClose={toggleModal}/>
        </>
    );
}

export default Goods;

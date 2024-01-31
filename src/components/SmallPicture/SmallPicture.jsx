import smallPicture from '../../assets/images/applesBig.png';
import classes from './SmallPicture.module.scss'

function SmallPicture() {
  return (
    <div className={classes.wrapper}>
      <img src={smallPicture} alt="Small product"  className={classes.smallPicture}/>
      <img src={smallPicture} alt="Small product"  className={classes.smallPicture}/>
      <img src={smallPicture} alt="Small product"  className={classes.smallPicture}/>
      <img src={smallPicture} alt="Small product"  className={classes.smallPicture}/>
      <img src={smallPicture} alt="Small product"  className={classes.smallPicture}/>
      <img src={smallPicture} alt="Small product"  className={classes.smallPicture}/>
    </div>
  );
}

export default SmallPicture;
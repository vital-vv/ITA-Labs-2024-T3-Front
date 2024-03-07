import bigProduct from '../../assets/images/applesBig.png';
import OneStepBack from '../OneStepBack/OneStepBack';
import ArrowScrollPictureLeft from '../../assets/svg/ArrowScrollPictureLeft';
import ArrowScrollPictureRight from '../../assets/svg/ArrowScrollPictureRight';
import SmallPicture from '../SmallPicture/SmallPicture';
import classes from './ImagesOfProduct.module.scss';
import { useSelector } from 'react-redux';

function ImagesOfProduct() {
  const {fullValidationForm} = useSelector(state => state.lots)

  return (
    <div className={classes.imagesOfProduct}>
      <div className={fullValidationForm ? null : classes.hidden}>
        <OneStepBack />
      </div>
      <div className={classes.bigProduct}>
        <img
          src={bigProduct}
          alt="Big product"
        />
        <div className={classes.arrowLeft}>
          <ArrowScrollPictureLeft />
        </div>
        <div className={classes.arrowRight}>
          <ArrowScrollPictureRight />
        </div>
      </div>
      <SmallPicture />
    </div>
  );
}

export default ImagesOfProduct;

import bigProduct from '../../assets/images/applesBig.png';
import OneStepBack from '../OneStepBack/OneStepBack';
import ArrowScrollPictureLeft from '../../assets/svg/ArrowScrollPictureLeft';
import ArrowScrollPictureRight from '../../assets/svg/ArrowScrollPictureRight';
import SmallPicture from '../SmallPicture/SmallPicture';
import classes from './ImagesOfProduct.module.scss';
import { useDispatch, useSelector } from 'react-redux';

function ImagesOfProduct() {
  const {fullValidationForm, bigPicture} = useSelector(state => state.lots);
  const dispatch = useDispatch();

  const handleChangeNextImage = () => {
    dispatch(showNextImage());
  }

  return (
    <div className={classes.imagesOfProduct}>
      <div className={fullValidationForm ? null : classes.hidden}>
        <OneStepBack />
      </div>
      <div className={classes.bigProduct}>
        <img
          src={fullValidationForm ? bigPicture : null}
          alt="Big product"
        />
        <div className={classes.arrowLeft}>
          <ArrowScrollPictureLeft />
        </div>
        <div className={classes.arrowRight} onClick={handleChangeNextImage}>
          <ArrowScrollPictureRight />
        </div>
      </div>
      <SmallPicture />
    </div>
  );
}

export default ImagesOfProduct;

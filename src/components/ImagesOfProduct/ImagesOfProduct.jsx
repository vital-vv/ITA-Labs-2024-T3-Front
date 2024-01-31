import bigProduct from '../../assets/images/applesBig.png';
import ArrowScrollPictureLeft from '../../assets/svg/ArrowScrollPictureLeft';
import ArrowScrollPictureRight from '../../assets/svg/ArrowScrollPictureRight';
import SmallPicture from '../SmallPicture/SmallPicture';
import classes from './ImagesOfProduct.module.scss';

function ImagesOfProduct() {
  return (
    <div className={classes.imagesOfProduct}>
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

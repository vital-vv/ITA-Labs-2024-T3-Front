import ImagesOfProduct from '../ImagesOfProduct/ImagesOfProduct';
import Description from '../Description/Description';
import classes from './ProductInfo.module.scss';
import ModalBid from '../ModalBid/ModalBid';

function ProductInfo() {
  return (
    <>
      <div className={classes.productInfo}>
        <ImagesOfProduct />
        <Description />
      </div>
      <ModalBid />
    </>
  );
}

export default ProductInfo;

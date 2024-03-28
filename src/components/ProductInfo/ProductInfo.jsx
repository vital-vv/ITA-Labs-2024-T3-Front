import ImagesOfProduct from '../ImagesOfProduct/ImagesOfProduct';
import Description from '../Description/Description';
import classes from './ProductInfo.module.scss';
import ModalBid from '../ModalBid/ModalBid';
import { useSelector } from 'react-redux';
import { changeShowModalAfterTime } from '../../features/lots/lotsSlice';

function ProductInfo() {
  const { showModalSuccess, currentBid } = useSelector((state) => state.lots);
  return (
    <>
      <div className={classes.productInfo}>
        <ImagesOfProduct />
        <Description />
      </div>
      <ModalBid text={`Your bid ${currentBid} was accepted`} showModal={showModalSuccess} action={changeShowModalAfterTime}/>
    </>
  );
}

export default ProductInfo;

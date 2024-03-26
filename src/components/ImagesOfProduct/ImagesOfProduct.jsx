import OneStepBack from '../OneStepBack/OneStepBack';
import ArrowScrollPictureLeft from '../../assets/svg/ArrowScrollPictureLeft';
import ArrowScrollPictureRight from '../../assets/svg/ArrowScrollPictureRight';
import SmallPicture from '../SmallPicture/SmallPicture';
import classes from './ImagesOfProduct.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  noteActive,
  showNextImage,
  showPreviousImage,
} from '../../features/lots/lotsSlice';
import { useEffect } from 'react';

function ImagesOfProduct() {
  const { fullValidationForm, bigPicture } = useSelector((state) => state.lots);
  const dispatch = useDispatch();

  const handleChangeNextImage = () => {
    dispatch(showNextImage());
  };

  const handleChangePreviousImage = () => {
    dispatch(showPreviousImage());
  };

  useEffect(() => {
    dispatch(noteActive())
  },[dispatch, bigPicture])

  return (
    <div className={classes.imagesOfProduct}>
      <div className={fullValidationForm ? null : classes.hidden}>
        <OneStepBack />
      </div>
      <div className={classes.bigProduct}>
        <img
          src={
            bigPicture ||
            'https://sun6-22.userapi.com/s/v1/ig1/_DJ8c5L0c7TBuaLA4iMhuMEOYFdYejfYxAsby0Bg5Mpe2eVJrgGdlirExp3BiQflSR4MhizW.jpg?size=200x200&quality=96&crop=0,0,799,799&ava=1'
          }
          alt="Big Picture"
        />
        <div className={classes.arrowLeft} onClick={handleChangePreviousImage}>
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

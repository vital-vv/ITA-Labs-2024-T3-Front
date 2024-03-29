import { useDispatch, useSelector } from 'react-redux';
import classes from './SmallPicture.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { changeBigPicture } from '../../features/lots/lotsSlice';

function SmallPicture() {
  const { picturesFiles } = useSelector(
    (state) => state.lots
  );
  const dispatch = useDispatch();

  const handleChangeBigPicture = (event) => {
    dispatch(changeBigPicture(event.target.id));
  };

  const allPictures = picturesFiles.map((picture) => {
    return (
      <img
        src={picture.url}
        alt="Small product"
        className={picture.isActive ? classes.smallPictureActive : classes.smallPicture}
        key={uuidv4()}
        onClick={handleChangeBigPicture}
        id={picture.url}
      />
    );
  });

  return (
    <div className={classes.wrapper}>
      {allPictures}
    </div>
  );
}

export default SmallPicture;

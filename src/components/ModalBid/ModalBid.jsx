import { useDispatch, useSelector } from 'react-redux';
import classes from './ModalBid.module.scss';
import { changeShowModalAfterTime } from '../../features/lots/lotsSlice';
import { useEffect } from 'react';

function ModalBid() {
  const { showModalSuccess, currentBid } = useSelector((state) => state.lots);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (showModalSuccess) {
      timer = setTimeout(() => {
        dispatch(changeShowModalAfterTime());
      }, 1500);
    }
    if (timer) {
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, showModalSuccess]);

  return (
    <div className={showModalSuccess ? classes.modal : classes.hidden}>
      Your bid {currentBid} is accepted
    </div>
  );
}

export default ModalBid;

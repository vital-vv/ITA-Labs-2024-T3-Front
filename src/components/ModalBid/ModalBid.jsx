import { useDispatch } from 'react-redux';
import classes from './ModalBid.module.scss';
import { useEffect } from 'react';
import { useValidationTimer } from '../../hook/useValidationAfterTime';

function ModalBid({text, showModal, action}) {
  const dispatch = useDispatch();

  useValidationTimer(!showModal, dispatch, action, null);

  return (
    <div className={showModal ? classes.modal : classes.hidden}>
      {text}
    </div>
  );
}

export default ModalBid;

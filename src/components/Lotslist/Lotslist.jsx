import Label from '../Label/Label.jsx';
import Content from '../Content/Content.jsx';
import ModalBid from '../ModalBid/ModalBid.jsx';
import classes from './LotsList.module.scss';
import BredCrumbs from '../BredCrumbs/BredCrumbs.jsx';
import { useEffect } from 'react';
import {
  clearAllParameters,
} from '../../features/filter/filterSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMainData
} from '../../features/main/mainSlice.js';
import { changeShowModalAfterTime } from '../../features/lots/lotsSlice.js';

function LotsList() {
  const dispatch = useDispatch(); 

  const { chosenOptions } =
    useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchMainData());
    if (chosenOptions.length) {
      dispatch(clearAllParameters());
    }
  }, [dispatch]);

  const { showModalSuccess, currentBid } = useSelector((state) => state.lots);
  
  return (
    <>
        <div className={classes.lotsList}>
          <BredCrumbs />
          <Label />
          <Content />
          <ModalBid text={`Your bid ${currentBid} was accepted`} showModal={showModalSuccess} action={changeShowModalAfterTime}/>
        </div>
    </>
  );
}

export default LotsList;

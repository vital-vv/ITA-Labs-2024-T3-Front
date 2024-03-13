import Label from '../Label/Label.jsx';
import Content from '../Content/Content.jsx';
import ModalBid from '../ModalBid/ModalBid.jsx';
import classes from './LotsList.module.scss';
import BredCrumbs from '../BredCrumbs/BredCrumbs.jsx';
import { useEffect } from 'react';
import { applyFilters } from '../../features/filter/filterSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCurrentCategory } from '../../features/filter/filterSlice.js';

function LotsList() {
  const dispatch = useDispatch();

  const { stringFilter, sortField, currentPage, chosenOptions } = useSelector(
    (state) => state.filter
  );
  const { leadBet } = useSelector(state => state.lots);

  const location = useLocation();
  const paramId = location.search.substring(4);

  useEffect(() => {
    dispatch(getCurrentCategory(paramId));
    dispatch(applyFilters());
  }, [
    dispatch,
    stringFilter,
    sortField,
    currentPage,
    chosenOptions.length,
    paramId,
    leadBet
  ]);

  return (
    <div className={classes.lotsList}>
      <BredCrumbs />
      <Label />
      <Content />
      <ModalBid />
    </div>
  );
}

export default LotsList;

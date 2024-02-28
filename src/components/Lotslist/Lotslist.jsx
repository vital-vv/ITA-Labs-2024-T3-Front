import Label from '../Label/Label.jsx';
import Content from '../Content/Content.jsx';
import classes from './LotsList.module.scss';
import BredCrumbs from '../BredCrumbs/BredCrumbs.jsx';
import { useEffect } from 'react';
import { applyFilters } from '../../features/filter/filterSlice.js';
import { useDispatch, useSelector } from 'react-redux';

function LotsList() {
  const dispatch = useDispatch();

  const { stringFilter, sortField, currentPage, chosenOptions, isLoading } =
    useSelector((state) => state.filter);
  const { isLoadingMain } = useSelector((state) => state.main);
  console.log(isLoading, isLoadingMain);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, stringFilter, sortField, currentPage, chosenOptions.length]);

  return (
    <div className={classes.lotsList}>
      <BredCrumbs />
      <Label />
      <Content />
    </div>
  );
}

export default LotsList;

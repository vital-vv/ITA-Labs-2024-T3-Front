import Label from '../Label/Label.jsx';
import Content from '../Content/Content.jsx';
import ModalBid from '../ModalBid/ModalBid.jsx';
import classes from './LotsList.module.scss';
import BredCrumbs from '../BredCrumbs/BredCrumbs.jsx';
import { useEffect } from 'react';
import {
  applyFilters,
  clearAllParameters,
} from '../../features/filter/filterSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getCurrentCategory,
  getDataFormated,
} from '../../features/filter/filterSlice.js';
import { getSubcategories } from '../../features/categories/subcategoriesSlice.js';
import {
  getRegionsCurrentCountry,
  fetchMainData,
} from '../../features/main/mainSlice.js';
import Loader from '../../hoc/Loader/Loader';

function LotsList() {
  const dispatch = useDispatch();
  const { currency, quantity, packaging, regions, isDataReady, countries } =
    useSelector((state) => state.main);
  const lengthUnits = useSelector((state) => state.main.sizing);
  const subcategories = useSelector((state) => state.subcategories.list);
  const isLoadingSubcategory = useSelector(
    (state) => state.subcategories.isLoading
  );

  const { stringFilter, sortField, currentPage, isLotsReady, chosenOptions } =
    useSelector((state) => state.filter);
  const { leadBet } = useSelector((state) => state.lots);

  const location = useLocation();
  const paramId = location.search.substring(4);

  useEffect(() => {
    dispatch(fetchMainData());
    if (chosenOptions.length) {
      dispatch(clearAllParameters());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentCategory(paramId));
    dispatch(getSubcategories(paramId));
    dispatch(getRegionsCurrentCountry('Belarus'));
  }, [dispatch, paramId]);

  useEffect(() => {
    if (isDataReady) {
      dispatch(
        getDataFormated({
          packages: packaging,
          valutes: currency,
          quantity: quantity,
          regions: regions,
          lengthUnits: lengthUnits,
          subcategories: subcategories,
          isLoading: isLoadingSubcategory,
        })
      );
    }
  }, [dispatch, packaging, countries, isLoadingSubcategory, regions]);
  
  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, stringFilter, sortField, currentPage, paramId, leadBet]);

  return (
    <>
      {isDataReady && isLotsReady && !isLoadingSubcategory ? (
        <div className={classes.lotsList}>
          <BredCrumbs />
          <Label />
          <Content />
          <ModalBid />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default LotsList;

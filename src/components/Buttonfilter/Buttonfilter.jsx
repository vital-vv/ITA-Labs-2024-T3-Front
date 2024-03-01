import classes from './ButtonFilter.module.scss';
import Close from '../../assets/svg/Close.jsx';
import { useDispatch } from 'react-redux';
import { clearAllParameters, sendFiltersString, applyFilters } from '../../features/filter/filterSlice.js';

const ButtonFilter = () => {
  const dispatch = useDispatch();

  const handleClearAllParemeters = () => {
    dispatch(clearAllParameters());
    dispatch(applyFilters());
  }

  const handleApplyFilters = () => {
    dispatch(sendFiltersString());
  }

  return (
    <>
      <div className={classes.buttonFilter} onClick={handleApplyFilters}>Apply filter</div>
      <div className={classes.close} onClick={handleClearAllParemeters}>
        <Close />
      </div>
    </>
  );
};
export default ButtonFilter;
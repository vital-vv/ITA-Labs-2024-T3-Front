import classes from './ButtonFilter.module.scss';
import Close from '../../assets/svg/Close.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllParameters, applyFilters } from '../../features/filter/filterSlice.js';

const ButtonFilter = () => {
  const dispatch = useDispatch();

  const handleClearAllParemeters = () => {
    dispatch(clearAllParameters());
  }

  const findAllFromCategory = (array, categoryName) =>
  array.filter((item) => item.categoryName === categoryName);
  
  const {
    sliderCurrentValues,
    valueOfQuantityCurrent,
    quantityValues,
    chosenOptions,
    sizeMeasuresToMm,
  } = useSelector(state => state.filter);
  const variety = findAllFromCategory(chosenOptions, 'variety');
  const packaging = findAllFromCategory(chosenOptions, 'packaging');
  const regions = findAllFromCategory(chosenOptions, 'region');
  let currentValues;
  if (!sizeMeasuresToMm) {
    currentValues = sliderCurrentValues.map((item) => item * 10);
  } else {
    currentValues = sliderCurrentValues;
  }
  let objectOfRequest = {
    fromSize: currentValues[0],
    toSize: currentValues[1],
    fromQuantity: quantityValues[0],
    toQuantity: quantityValues[1],
    // weights: valueOfQuantityCurrent.toUpperCase(),
    varieties: variety,
    packaging: packaging,
  };
  if (objectOfRequest.weights === 'KG') {
    objectOfRequest.weights = 'KILOGRAM'
  };
  const arrayUnique = Object.entries(objectOfRequest).filter(
    (item) => item[1].length !== 0
  );
  arrayUnique.forEach((item, _, array) => {
    if (Array.isArray(item[1])) {
      item[1] = item[1].map((item) => item.name.toUpperCase());
      while (item[1].length > 1) {
        array.push([item[0], item[1][item[1].length-1]]);
        item[1].pop();
      }
      item[1] = item[1].join();
    }
  });
  let requestString = arrayUnique.map(item => item.join('=')).join('&');

  const handleApplyFilters = () => {
    dispatch(applyFilters(requestString));
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
import classes from './NumberInput.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeSliderByKeysFrom, changeSliderByKeysUntil } from '../../features/filter/filterSlice';

const NumberInput = () => {
  const [from, until] = useSelector(
    (state) => state.filter.sliderDefaultValues
  );
  const dispatch = useDispatch();

  const changeFrom = (event) => {
    dispatch(changeSliderByKeysFrom(event.target.value));
  };

  const changeUntil = (event) => {
    dispatch(changeSliderByKeysUntil(event.target.value));
  };

  return (
    <div className={classes.inputs}>
      <input type="text" placeholder={from} onChange={changeFrom} value={from}/>
      <input type="text" placeholder={until} onChange={changeUntil} value={until}/>
    </div>
  );
};

export default NumberInput;

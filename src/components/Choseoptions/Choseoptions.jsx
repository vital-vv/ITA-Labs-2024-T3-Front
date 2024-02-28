import classes from './ChoseOptions.module.scss';
import Selector from '../Selector/Selector';
import DeleteOption from '../../assets/svg/DeleteOption';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteOption, applyFilters, sendFiltersString } from '../../features/filter/filterSlice';

function ChoseOptions() {
  const dispatch = useDispatch();
  const chosenOptions = useSelector((state) => state.filter.chosenOptions);
  const handleDeleteOption = (event) => {
    dispatch(deleteOption(event.currentTarget.id));
    dispatch(applyFilters());
  };
  return (
    <div className={classes.chosenOptions}>
      <div className={classes.dynamicOptions}>
        {chosenOptions.map((item) => {
          return (
            <div key={uuidv4()}>
              <p>{item.name}</p>
              <p onClick={handleDeleteOption} id={item.id} className={classes.delete}>
                <DeleteOption />
              </p>
            </div>
          );
        })}
      </div>
      <Selector />
    </div>
  );
}

export default ChoseOptions;

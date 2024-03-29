import classes from './selector.module.scss';
import { options } from '../dataoffilter';
import { useDispatch, useSelector } from 'react-redux';
import { sortBySelector } from '../../features/filter/filterSlice';
import { v4 as uuidv4 } from 'uuid';

export default function Selector() {
  const dispatch = useDispatch();
  const {currentLabelSelector} = useSelector(state => state.filter);

  const handleChangeSelectorSort = (event) => {
    dispatch(sortBySelector(event.target.value));
    setSelectValue(event.target.value);
  };

  const [selectValue, setSelectValue] = useState('') 

  return (
    <div className={classes.selector}>
      <div>
        <select
          id="selector order"
          onChange={handleChangeSelectorSort}
          value={selectValue}
        >
          {options.map((option) => {
            return (
              <option
                value={option.value}
                key={uuidv4()}
                label={option.label}
              ></option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

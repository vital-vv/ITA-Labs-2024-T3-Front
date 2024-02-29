import classes from './selector.module.scss';
import {options} from '../dataoffilter'
import { useDispatch } from 'react-redux';
import { sortBySelector } from '../../features/filter/filterSlice';
import { v4 as uuidv4 } from 'uuid';

export default function Selector() {
  const dispatch = useDispatch();

  const handleChangeSelectorSort = (event) => {
    dispatch(sortBySelector(event.target.value))
  }

  return (
    <div className={classes.selector}>
      <div>
        <select id="selector order" onChange={handleChangeSelectorSort}>
          {options.map((option) => {
            return <option value={option.value} key={uuidv4()}>{option.label}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

import classes from './selector.module.scss';
import {options} from '../dataoffilter'
import { useDispatch } from 'react-redux';
import { sortBySelector } from '../../features/filter/filterSlice';

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
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

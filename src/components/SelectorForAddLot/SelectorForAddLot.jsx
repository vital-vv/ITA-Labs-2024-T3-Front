import { v4 as uuidv4 } from 'uuid';
import classes from './SelectorForAddLot.module.scss';

function SelectorForAddLot({
  firstSelector,
  secondSelector,
  firstPlaceholder,
  secondPlaceholder,
  label
}) {
  const fillSelectors = (array) => {
    return array.map((item) => {
      return <option key={uuidv4()}>{item}</option>;
    });
  };

  return (
    <div>
      <p>{label}</p>
      <div className={classes.locationSelector}>
        <select>
          <option value="" disabled selected>
            {firstPlaceholder}
          </option>
          {fillSelectors(firstSelector)}
        </select>
        <select>
          <option value="" disabled selected>
            {secondPlaceholder}
          </option>
          {fillSelectors(secondSelector)}
        </select>
      </div>
    </div>
  );
}

export default SelectorForAddLot;

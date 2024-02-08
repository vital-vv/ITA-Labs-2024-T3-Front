import { v4 as uuidv4 } from 'uuid';
import classes from './SelectorAndInputForAddLot.module.scss';

function SelectorAndInputForAddLot({ placeholder, options, label }) {
  return (
    <div>
      <p>{label}</p>
      <div className={classes.locationSelector}>
        <input type="text" placeholder={placeholder} />
        <select>
          {options.map((item) => {
            return <option key={uuidv4()}>{item}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectorAndInputForAddLot;

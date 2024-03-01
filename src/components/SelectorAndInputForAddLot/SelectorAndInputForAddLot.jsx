import { v4 as uuidv4 } from 'uuid';
import classes from './SelectorAndInputForAddLot.module.scss';

function SelectorAndInputForAddLot({ placeholder, options, label, changeInput, inputValue, isValid, changeSelector, selectorValue }) {
  return (
    <div>
      <p>{label}</p>
      <div className={classes.locationSelector}>
        <input type="text" placeholder={placeholder} onChange={changeInput} value={inputValue} className={ isValid ? null : classes.novalid}/>
        <select onChange={changeSelector} value={selectorValue}>
          {options.map((item) => {
            return <option key={uuidv4()} value={item}>{item}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectorAndInputForAddLot;

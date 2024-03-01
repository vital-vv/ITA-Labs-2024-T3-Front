import { v4 as uuidv4 } from 'uuid';
import classes from './SingleSelectorForAddLot.module.scss';

function SingleSelectorForAddLot({label, changeOption, chosenOption, categories}) {
  const fillSelectors = array => {
    return array.map((item) => {
      return (
        <option
          key={uuidv4()}
          value={item.name}
        >
          {item.name}
        </option>
      );
    });
  };

  return (
    <div>
      <p>{label}</p>
      <div className={classes.locationSelector}>
        <select onChange={changeOption} value={chosenOption || ''}>
          {fillSelectors(categories)}
        </select>
      </div>
    </div>
  );
}

export default SingleSelectorForAddLot;

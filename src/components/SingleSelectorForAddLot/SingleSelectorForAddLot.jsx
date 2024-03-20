import { v4 as uuidv4 } from 'uuid';
import classes from './SingleSelectorForAddLot.module.scss';

function SingleSelectorForAddLot({
  label,
  changeOption,
  chosenOption,
  categories,
  needPlaceholder,
}) {
  const fillSelectors = (array) => {
    if (!categories) {
      return;
    }
    return array.map((item) => {
      return (
        <option key={uuidv4()} value={item.name}>
          {item.name}
        </option>
      );
    });
  };

  return (
    <div>
      <p>{label}</p>
      <div className={classes.locationSelector}>
        <select
          onChange={changeOption}
          value={chosenOption || ''}
          disabled={!categories}
        >
          {needPlaceholder && (
            <option disabled value="" selected>
              Choose category and subcategory
            </option>
          )}
          {fillSelectors(categories)}
        </select>
      </div>
    </div>
  );
}

export default SingleSelectorForAddLot;

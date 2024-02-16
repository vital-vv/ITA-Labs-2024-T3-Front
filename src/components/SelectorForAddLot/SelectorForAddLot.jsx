import { v4 as uuidv4 } from 'uuid';
import classes from './SelectorForAddLot.module.scss';
import { useDispatch } from 'react-redux';


function SelectorForAddLot({
  firstSelector,
  secondSelector,
  firstPlaceholder,
  secondPlaceholder,
  label,
  changeFirstOption,
  subcategoryKey,
  chosenFirstOption,
  chosenSecondOption,
  changeSecondOption
})
{
    const fillSelectors = (array, subcategoryKey) => {
    return array.map((item) => {
      return <option key={uuidv4()} value={item.name} data-subcategory={item[subcategoryKey]}>{item.name}</option>;
    });
  };
  
  return (
    <div>
      <p>{label}</p>
      <div className={classes.locationSelector}>
        <select onChange={changeFirstOption} value={chosenFirstOption || ''}>
          <option  disabled value='' selected>
            {firstPlaceholder}
          </option>
          {fillSelectors(firstSelector, subcategoryKey)}
        </select>
        <select disabled = {!secondSelector} value={chosenSecondOption || ''} onChange={changeSecondOption}>
          <option disabled value='' selected>
            {secondPlaceholder}
          </option>
          {secondSelector ? (fillSelectors(secondSelector)) : (null)}
        </select>
      </div>
    </div>
  );
}

export default SelectorForAddLot;

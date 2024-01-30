import { useState } from 'react';
import classes from './ElementForFilter.module.scss';
import CheckBoxEnable from '../../assets/svg/CheckBoxEnable';
import CheckBoxDisable from '../../assets/svg/CheckBoxDisable';

const ElementForFilter = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const toogleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <p className={classes.allElement} onClick={toogleCheckbox}>
        <div className={classes.boxInput}>
          {isChecked ? (
            <CheckBoxEnable/>
          ) : (
            <CheckBoxDisable/>
          )}
        </div>
        <p htmlFor={props.id}>
          {props.name}
        </p>
      </p>
    </div>
  );
};

export default ElementForFilter;
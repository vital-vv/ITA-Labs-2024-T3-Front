import { useState, useEffect } from 'react';
import classes from './ElementForFilter.module.scss';
import CheckBoxEnable from '../../assets/svg/CheckBoxEnable';
import CheckBoxDisable from '../../assets/svg/CheckBoxDisable';
import { useDispatch } from 'react-redux';
import { choseCheckbox } from '../../features/filter/filterSlice';

const ElementForFilter = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  
  const toogleCheckbox = (event) => {
    setIsChecked(!isChecked);
    dispatch(choseCheckbox({id: event.currentTarget.id, name: props.name, isChecked:isChecked}));
  };

  
  return (
      <p className={classes.allElement} onClick={toogleCheckbox} id={props.id}>
        <div className={classes.boxInput}>
          {isChecked ? (
            <CheckBoxEnable/>
          ) : (
            <CheckBoxDisable/>
          )}
        </div>
        <p>
          {props.name}
        </p>
      </p>
  );
};

export default ElementForFilter;
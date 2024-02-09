import classes from './NumberInput.module.scss';

const NumberInput = ({from, until, changeFrom, changeUntil, isValidFrom, isValidUntil}) => {
  
  return (
    <div className={classes.inputs}>
      <input type="text" onChange={changeFrom} value={from} className={!isValidFrom ? classes.red : null} />
      <input type="text" onChange={changeUntil} value={until} className={!isValidUntil ? classes.red : null}/>
    </div>
  );
};

export default NumberInput;

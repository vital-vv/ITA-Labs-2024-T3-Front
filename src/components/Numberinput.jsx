import classes from '../assets/styles/Numberinput.module.scss';

const NumberInput = (props) => {
  
  return (
    <div className={classes.inputs}>
      <input type="text" placeholder={props.from} />
      <input type="text" placeholder={props.until} />
    </div>
  );
};

export default NumberInput;

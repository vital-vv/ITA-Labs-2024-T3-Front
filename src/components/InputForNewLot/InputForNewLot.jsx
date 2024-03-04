import classes from './InputForNewLot.module.scss';

function InputForNewLot({
  placeholder,
  title,
  value,
  handleChangeInput,
  isValid,
}) {

  return (
    <>
      {title}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChangeInput}
        className={isValid ? null : classes.novalide}
      />
    </>
  );
}

export default InputForNewLot;

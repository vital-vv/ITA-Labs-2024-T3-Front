import styles from './InputContainerUser.module.scss';
import { TextField } from '@mui/material';

function InputContainerUser({
  firstName,
  lastName,
  email,
  phoneNumber,
  changeFirstNameField,
  changeLastNameField,
  chooseCountryCode,
  changePhoneNumber,
  code
}) 
{
  return (
    <div className={styles.inputContainer}>
      <TextField
        id="standard-helperText"
        label="First name"
        value={firstName}
        variant="outlined"
        className={styles.editInput}
        onChange={changeFirstNameField}
      />
       <TextField
        id="standard-helperText"
        label="Last name"
        value={lastName}
        variant="outlined"
        className={styles.editInput}
        onChange={changeLastNameField}
      />
      <TextField
        disabled
        id="outlined-disabled"
        label="Email"
        value={email}
        className={styles.editInput}
      />
      <div className={styles.numberContainer}>
        <select onChange={chooseCountryCode} value={code}>
          <option>+375</option>
          <option>+44</option>
        </select>
        <TextField
          id="standard-helperText"
          label="Phone"
          value={phoneNumber}
          variant="outlined"
          className={styles.phoneNumber}
          onChange={changePhoneNumber}
        />
      </div>
    </div>
  );
}

export default InputContainerUser;

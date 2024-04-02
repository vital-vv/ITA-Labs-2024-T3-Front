import styles from './InputContainerUser.module.scss';
import { TextField } from '@mui/material';
import Check from '../../assets/svg/Check';
import { useSelector } from 'react-redux';

function InputContainerUser({
  firstName,
  lastName,
  email,
  phoneNumber,
  changeFirstNameField,
  changeLastNameField,
  chooseCountryCode,
  changePhoneNumber,
  code,
  changeEmailField,
  showValidationCode,
  confirmationCode,
  changeConfirmationCode,
  requestChangeEmail,
  confirmEmail
}) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email);
  const color = { backgroundColor: 'gray', border: '1px solid gray' };
  const oldEmail = useSelector(state => state.currentUser.copyUserData.email);
  const isOldEmail = oldEmail === email;

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
      <div className={styles.email}>
        <TextField
          id="outlined-disabled"
          label="Email"
          value={email}
          className={styles.editInput}
          onChange={changeEmailField}
        />
        <button
          className={styles.changeEmail}
          onClick={requestChangeEmail}
          disabled={!isValidEmail || isOldEmail}
          style={isValidEmail && !isOldEmail ? null : color}
        >
          Change Email
        </button>
      </div>
      <div className={showValidationCode ? null : styles.hidden}>
        <p>Enter code from {email} here:</p>
        <div className={styles.email}>
          <TextField
            id="standard-helperText"
            label="Enter your code confirmation here"
            value={confirmationCode}
            variant="outlined"
            className={styles.editInput}
            onChange={changeConfirmationCode}
          />
          <button className={styles.changeEmail} onClick={confirmEmail}>
            <Check />
          </button>
        </div>
      </div>
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

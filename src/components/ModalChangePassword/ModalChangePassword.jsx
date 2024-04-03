import { Modal, Box, InputAdornment, IconButton } from '@mui/material';
import Close from '../../assets/svg/Close';
import classes from './ModalChangePassword.module.scss';
import AdaptTextField from '../Account/AdaptTextField';
import EyePassword from '../../assets/svg/EyePassword';
import { useEffect, useState } from 'react';
import { resetPassword, confirmResetPassword, updatePassword } from '@aws-amplify/auth';
import { useSelector } from 'react-redux';

function ModalChangePassword({ open, close }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showFormCodeValidation, setShowFormCodeValidation] = useState(false);
  const [valuePassword, setValuePassword] = useState('');
  const [valueCodeConfirmation, setCodeConfirmation] = useState('');
  const [valueNewPassword, setValueNewPassword] = useState('');
  const [valueConfirmPassword, setValueConfirmPassword] = useState('');
  const [wrongCodeConfirmation, setWrongCodeConfirmation] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { email } = useSelector((state) => state.currentUser.userData);

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleResetPassword = async () => {
    setShowFormCodeValidation(true);
    try {
      await resetPassword({ username: email });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShowFormCodeValidation(false);
    setCodeConfirmation('');
    setValuePassword('');
    setValueNewPassword('');
    setValueConfirmPassword('');
    setWrongCodeConfirmation(false);
    setIsSuccess(false);
  }, [open]);

  const regForCheckPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z\d\W]{8,}$/;
  const isValidPassword =
    valueNewPassword === valueConfirmPassword &&
    regForCheckPassword.test(valueNewPassword);

  const handleSendNewPassword = async () => {
    if (showFormCodeValidation) {
      try {
        await confirmResetPassword({ username: email, confirmationCode: valueCodeConfirmation, newPassword: valueNewPassword });
      } catch (error) {
        setWrongCodeConfirmation(true);
        return
      }
    } else {
      try {
        await updatePassword({ oldPassword: valuePassword, newPassword: valueNewPassword });
      } catch (err) {
        console.log(err);
        return
      }
    }
    setIsSuccess(true);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={classes.labelModal}>
          <p>Change Password</p>
          <button className={classes.buttonClose} onClick={close}>
            <Close />
          </button>
        </div>
        <div className={classes.inputBlock}>
          <AdaptTextField
            label="Current password"
            variant="outlined"
            className={classes.inputPassword}
            type={showPassword ? 'password' : 'text'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}                    
                  >
                    <EyePassword />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={valuePassword}
            onChange={(event) => setValuePassword(event.target.value)}
          />
          <p className={classes.forgotPassword} onClick={handleResetPassword}>
            Forgot your password?
          </p>
          <div
            className={
              showFormCodeValidation
                ? classes.codeValidation
                : classes.notDisplay
            }
          >
            <AdaptTextField
              label="Code validation from your email"
              variant="outlined"
              className={classes.inputPassword}
              type="text"
              value={valueCodeConfirmation}
              onChange={(event) => setCodeConfirmation(event.target.value)}
            />
            <p className={wrongCodeConfirmation ? classes.incorrect : classes.notDisplay}>Your entered incorrect code</p>
          </div>
          <AdaptTextField
            label="New password"
            variant="outlined"
            className={classes.inputPassword}
            type="password"
            value={valueNewPassword}
            onChange={(event) => setValueNewPassword(event.target.value)}
          />
          <div>
            <li>Must be at least 8 characters</li>
            <li>Should have at least 1 uppercase letter</li>
            <li>Should have at least 1 lowercase letter</li>
            <li>Should have at least 1 number</li>
            <li>Should have at least 1 special symbol</li>
          </div>
          <AdaptTextField
            label="Confirm new password"
            variant="outlined"
            className={classes.inputPassword}
            type="password"
            value={valueConfirmPassword}
            onChange={(event) => setValueConfirmPassword(event.target.value)}
          />
          <h3 className={isSuccess ? null : classes.hidden}>Success! You changed your password</h3>
          <button
            className={
              isValidPassword
                ? classes.passwordChangeValid
                : classes.passwordChangeInvalid
            }
            disabled={!isValidPassword}
            onClick={handleSendNewPassword}
          >
            Set new password
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalChangePassword;

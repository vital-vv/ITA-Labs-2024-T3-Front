import Check from '../../assets/svg/Check';
import InputContainerUser from '../InputContainerUser/InputContainerUser';
import classes from './Account.module.scss';
import { v4 as uuidv4 } from 'uuid';
import Pencil from '../../assets/svg/Pencil';
import Trash from '../../assets/svg/Trash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMainData } from '../../features/main/mainSlice';
import Loader from '../../hoc/Loader/Loader';
import {
  changeFirstNameField,
  changeLastNameField,
  changePhoneNumber,
  chooseCountryCode,
  chooseCurrency,
  getAvatar,
  changeAvatar,
  cancelAllChanges,
  deleteAvatar,
  changeCurrentUser,
  changeShowModalAfterTime,
  changeEmail,
  setTokens,
  fetchUserData,
} from '../../features/currentUser/currentUserSlice';
import ModalBid from '../ModalBid/ModalBid';
import {
  updateUserAttribute,
  confirmUserAttribute,
  fetchAuthSession,
} from 'aws-amplify/auth';
import Lock from '../../assets/svg/Lock';
import ModalChangePassword from '../ModalChangePassword/ModalChangePassword';

function Account() {
  const { currency, isDataReady } = useSelector((state) => state.main);
  const {
    first_name,
    last_name,
    preferred_currency,
    email,
    number,
    phoneCode,
    urlAvatar,
  } = useSelector((state) => state.currentUser.userData);

  const { userReady, isValidNewData, showModalSuccess } = useSelector(
    (state) => state.currentUser
  );
  const dispatch = useDispatch();

  const sendDataToState = (dispatch, data, event) => {
    dispatch(data(event.target.value));
  };

  async function handleUpdateUserAttribute(attributeKey, value) {
    try {
      const output = await updateUserAttribute({
        userAttribute: {
          attributeKey,
          value,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleConfirmUserAttribute({
    userAttributeKey,
    confirmationCode,
  }) {
    try {
      await confirmUserAttribute({ userAttributeKey, confirmationCode });
    } catch (error) {
      setIsInvalidCode(true);
      console.log(error);
    }
  }

  async function currentSession() {
    try {
      fetchAuthSession({ forceRefresh: true })
        .then((objTokens) => {
          const accessToken = objTokens.tokens.accessToken.toString();
          const idToken = objTokens.tokens.idToken.toString();
          dispatch(setTokens({ accessToken, idToken }));
          dispatch(changeCurrentUser(newAvatar));
          dispatch(fetchUserData());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!isDataReady) {
      dispatch(fetchMainData());
    }
  }, [dispatch, isDataReady]);

  useEffect(() => {
    if (userReady) {
      dispatch(getAvatar());
    }
  }, [dispatch, userReady]);

  const handleChangeFirstNameField = (event) => {
    sendDataToState(dispatch, changeFirstNameField, event);
  };

  const handleChangeLastNameField = (event) => {
    sendDataToState(dispatch, changeLastNameField, event);
  };

  const handleChangePhoneNumber = (event) => {
    sendDataToState(dispatch, changePhoneNumber, event);
  };

  const handleChooseCountryCode = (event) => {
    sendDataToState(dispatch, chooseCountryCode, event);
  };

  const handleChooseCurrency = (event) => {
    sendDataToState(dispatch, chooseCurrency, event);
  };

  const inputFile = useRef();

  const handleChangeAvatar = () => {
    inputFile.current.click();
  };

  const handleChangeAvatarFile = (event) => {
    const fileAvatar = event.target.files[0];
    const newAvatar = URL.createObjectURL(fileAvatar);
    setNewAvatar(fileAvatar);
    dispatch(changeAvatar(newAvatar));
  };

  const handleCancelAllChanges = () => {
    dispatch(cancelAllChanges());
    setNewAvatar(null);
  };

  const handleDeleteAvatar = () => {
    dispatch(deleteAvatar());
    setNewAvatar(null);
  };

  const color = { color: 'gray', border: '1px solid gray' };

  const handleChangeCurrentUser = () => {
    dispatch(changeCurrentUser(newAvatar));
  };

  const [newAvatar, setNewAvatar] = useState(null);
  const [openConfirmed, setOpenConfirmed] = useState(false);
  const [codeConfirmed, setCodeConfirmed] = useState('');
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isOpenModalChangingPassword, setIsOpenModalChangingPassword] =
    useState(false);

  const handleChangeEmailField = (event) => {
    sendDataToState(dispatch, changeEmail, event);
  };

  const handleChangeCodeConfirmed = (event) => {
    setIsInvalidCode(false);
    setCodeConfirmed(event.target.value);
  };

  const handleRequestChangeEmail = () => {
    setOpenConfirmed(true);
    handleUpdateUserAttribute('email', email);
  };

  const handleConfirmEmail = async () => {
    setIsInvalidCode(false);
    handleConfirmUserAttribute({
      confirmationCode: codeConfirmed,
      userAttributeKey: 'email',
    });
    if (!isInvalidCode) {
      return;
    }
    await currentSession();
    setOpenConfirmed(false);
    setCodeConfirmed('');
  };

  const handleToogleModalChangingPassword = () => {
    setIsOpenModalChangingPassword((prev) => !prev);
  };

  return (
    <>
      {isDataReady ? (
        <div className={classes.userInfo}>
          <p>Personal data</p>
          <div>
            <div className={classes.userForm}>
              <div className={classes.circle}>
                {urlAvatar ? (
                  <img src={urlAvatar} alt="avatar" />
                ) : first_name && last_name ? (
                  `${first_name[0]}${last_name[0]}`.toUpperCase()
                ) : (
                  'AA'
                )}
                <div
                  className={classes.takePhotoRight}
                  onClick={handleChangeAvatar}
                >
                  <input
                    type="file"
                    className={classes.inputFile}
                    ref={inputFile}
                    accept="image/*, .png, .jpg, .gif, .web,"
                    onChange={handleChangeAvatarFile}
                  />
                  <Pencil />
                </div>
                <div
                  className={classes.takePhotoLeft}
                  onClick={handleDeleteAvatar}
                >
                  <Trash />
                </div>
              </div>
              <div>
                <InputContainerUser
                  firstName={first_name}
                  lastName={last_name}
                  preferredCurrency={preferred_currency}
                  email={email}
                  phoneNumber={number}
                  changeFirstNameField={handleChangeFirstNameField}
                  changeLastNameField={handleChangeLastNameField}
                  chooseCountryCode={handleChooseCountryCode}
                  changePhoneNumber={handleChangePhoneNumber}
                  code={phoneCode}
                  changeEmailField={handleChangeEmailField}
                  showValidationCode={openConfirmed}
                  confirmationCode={codeConfirmed}
                  changeConfirmationCode={handleChangeCodeConfirmed}
                  requestChangeEmail={handleRequestChangeEmail}
                  confirmEmail={handleConfirmEmail}
                  isInvalidCode={isInvalidCode}
                />
                <select
                  className={classes.currency}
                  value={preferred_currency}
                  onChange={handleChooseCurrency}
                >
                  {currency.map((item) => {
                    return (
                      <option key={uuidv4()} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <button
                onClick={handleCancelAllChanges}
                className={classes.cancel}
              >
                Cancel
              </button>
              <button
                disabled={!isValidNewData}
                className={isValidNewData ? classes.confirm : classes.cancel}
                style={!isValidNewData ? color : null}
                onClick={handleChangeCurrentUser}
              >
                <Check />
                <p>Save changes</p>
              </button>
            </div>
          </div>
          <div className={classes.security}>
            <p>Security</p>
            <div onClick={handleToogleModalChangingPassword}>
              <Lock />
              <p>Change password</p>
            </div>
          </div>
          <ModalChangePassword open={isOpenModalChangingPassword} close={handleToogleModalChangingPassword}/>
          <ModalBid
            text={`Your settings was changed`}
            showModal={showModalSuccess}
            action={changeShowModalAfterTime}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Account;

import styles from './RightBar.module.scss';
import langIcon from '../../../assets/images/langIcon.png';
import usdIcon from '../../../assets/images/usdIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, sendCurrencyThisSession } from '../../../features/currentUser/currentUserSlice.js';
import { IsAuthorized } from './IsAuthorized/IsAuthorized.jsx';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect } from 'react';
import { fetchMainData } from '../../../features/main/mainSlice.js';
import { v4 as uuidv4 } from 'uuid';

function RightBar() {
  const user = useSelector(selectUserData);
  const rightBarStyle = {
    width: user.userData?.role === 'USER' ? '550px' : '300px',
  };
  const {currencyThisSession} = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const {currency} = useSelector((state) => state.main)

  useEffect(() => {
    dispatch(fetchMainData());
  }, [dispatch]);

  const handleChangeCurrency = event => {
    dispatch(sendCurrencyThisSession(event.target.value))
  }

  return (
    <div className={styles.rightBar} style={rightBarStyle}>
      <div className={styles.variety}>
        <img alt={usdIcon} src={usdIcon} />
        <FormControl
          sx={{ m: 1, minWidth: 120, borderColor: '#38999b' }}
          size="small"
        >
          <InputLabel id="demo-select-small-label" sx={{ color: '#38999b',  }}>
            Currency
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={currencyThisSession}
            label="Currency"
            onChange={handleChangeCurrency}
          >
            {currency && currency.map(item => {
              return <MenuItem value={item} key={uuidv4()}>{item}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      <div className={styles.variety}>
        <p>ENG</p>
        <img alt={langIcon} src={langIcon} />
      </div>
      <IsAuthorized />
    </div>
  );
}

export { RightBar };

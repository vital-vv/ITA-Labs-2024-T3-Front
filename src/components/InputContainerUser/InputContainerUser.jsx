import styles from './InputContainerUser.module.scss';
import {TextField} from '@mui/material';

function InputContainerUser() {
    return ( <div className={styles.inputContainer}>
        <TextField
            id="standard-helperText"
            label="Name"
            defaultValue="Sam Foster"
            variant="outlined"
            className={styles.editInput}
            disabled
        />
        <TextField
            disabled
            id="outlined-disabled"
            label="Email"
            defaultValue="SamFoss92@gamil.com"
            className={styles.editInput}
        />
        <div className={styles.numberContainer}>
            <select disabled>
                <option>+375</option>
                <option>2</option>
            </select>
            <TextField
                disabled
                id="standard-helperText"
                label="Phone"
                defaultValue="297369823"
                variant="outlined"
                className={styles.phoneNumber}
            />
        </div>
    </div> );
}

export default InputContainerUser;
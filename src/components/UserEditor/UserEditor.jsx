import styles from './UserEditor.module.scss';
import {TextField} from '@mui/material';
import editIcon from '../../assets/images/editIconGreen.png';
import deleteIcon from '../../assets/images/deleteIcon.png';

function UserEditor() {

    return (
        <div className={styles.userEditorWindow}>
            <div className={styles.userBox}>
                <div className={styles.editTitle}>
                    Personal data of
                    <span>Sam Foster</span>
                </div>
                <div className={styles.userData}>
                    <div className={styles.avatar}>
                        <div className={styles.nickname}>SF</div>
                    </div>
                    <div className={styles.inputContainer}>
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
                        <div className={styles.groupBtn}>
                            <button className={`${styles.btn} ${styles.editBtn}`}>
                                <img src={editIcon} alt={editIcon}/>
                                <p>Edit data</p>
                            </button>
                            <button className={`${styles.btn} ${styles.deleteBtn}`}>
                                <img src={deleteIcon} alt={deleteIcon}/>
                                <p>Delete user</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {UserEditor}

import styles from './UserDataInputs.module.scss';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../../utils/routes.js';
import {TextField} from '@mui/material';
import PropTypes, {oneOfType,string, element} from 'prop-types';
import editIcon from '../../../assets/images/editIconGreen.png';
import deleteIcon from '../../../assets/images/deleteIcon.png';

UserDataInputs.propTypes = {
    title: oneOfType([string, element]),
    display: PropTypes.string,
};

function UserDataInputs({display, title}) {

    function ButtonGroup() {
        if (display === 'create') {
            return <button className={`${styles.btn} ${styles.greenBtn}`} disabled={true}>Create user</button>
        } else if (display === 'edit') {
            return (
                <>
                    <button className={`${styles.btn} ${styles.greenBtn}`}>
                        <img src={editIcon} alt={editIcon}/>
                        <p>Edit data</p>
                    </button>
                    <button className={`${styles.btn} ${styles.redBtn}`}>
                        <img src={deleteIcon} alt={deleteIcon}/>
                        <p>Delete user</p>
                    </button>
                </>
            )
        }
    }

    return (
        <div className={styles.userBox}>
            <div className={styles.title}>
                <div>{title}</div>
                <NavLink to={ROUTES.ADMINUSERS}>Back to users →</NavLink>
            </div>
            <div className={styles.userData}>
                <div className={styles.avatar}>
                    <div className={styles.nickname}>SF</div>
                </div>
                <div className={styles.inputContainer}>
                    <TextField disabled = {display !== 'create'} label="First Name" variant="outlined" className={styles.editInput}/>
                    <TextField disabled = {display !== 'create'} label="Second Name" className={styles.editInput}/>
                    <TextField disabled = {display !== 'create'} label="Email" className={styles.editInput}/>
                    <div className={styles.numberContainer}>
                        <select disabled = {display !== 'create'}>
                            <option>+375</option>
                            <option>+44</option>
                        </select>
                        <TextField disabled = {display !== 'create'} label="Phone" className={styles.phoneNumber}/>
                    </div>
                    <div className={styles.groupBtn}>
                        <ButtonGroup/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {UserDataInputs}




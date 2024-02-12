import styles from './UserDataInputs.module.scss';
import {TextField} from '@mui/material';

import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../../utils/routes.js';
import PropTypes, {oneOfType,string, element} from 'prop-types';

import {ButtonGroup} from '../ButtonGroup/ButtonGroup.jsx';


UserDataInputs.propTypes = {
    title: oneOfType([string, element]),
    display: PropTypes.string,
};

function UserDataInputs({display, title}) {

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
                        <ButtonGroup display={display}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {UserDataInputs}




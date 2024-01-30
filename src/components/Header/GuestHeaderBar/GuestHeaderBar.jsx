import styles from './GuestHeader.module.scss';
import currencyIcon from '../../../assets/images/currencyIcon.png';
import langIcon from '../../../assets/images/langIcon.png';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../../utils/routes.js';
import loginIcon from '../../../assets/images/loginIcon.png';

function GuestHeaderBar() {

    return (
        <div className={styles.rightBar}>
            <div><p>USD</p><img alt={currencyIcon} src={currencyIcon}/></div>
            <div><p>ENG</p><img alt={langIcon} src={langIcon}/></div>
            <NavLink to={ROUTES.LOGIN}>
                <div><p>Log in</p><img alt={loginIcon} src={loginIcon}/></div>
            </NavLink>
        </div>
    )
}

export {GuestHeaderBar}

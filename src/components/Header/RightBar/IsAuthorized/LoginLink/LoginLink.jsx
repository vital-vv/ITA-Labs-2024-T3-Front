import {NavLink} from "react-router-dom";
import {ROUTES} from "../../../../../utils/routes.js";
import styles from './LoginLink.module.scss';
import loginIcon from '../../../../../assets/images/login.png';

function LoginLink() {

    return (
                <NavLink to={ROUTES.LOGIN} className={styles.loginContainer}>
                    Login <img className={styles.loginIcon} src={loginIcon} alt="loginIcon" />
                </NavLink>
    );
}

export {LoginLink};

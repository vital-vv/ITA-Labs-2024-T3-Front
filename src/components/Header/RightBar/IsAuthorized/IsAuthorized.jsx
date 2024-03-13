import styles from './IsAuthorized.module.scss';
import {useSelector} from "react-redux";
import {selectUserData} from "../../../../features/currentUser/currentUserSlice.js";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../../../utils/routes.js";
import Plus from "../../../../assets/svg/Plus.jsx";
import Badge from "@mui/material/Badge";
import badgeIcon from '../../../../assets/images/badgeIcon.png';
import loginIcon from '../../../../assets/images/login.png';
import BasicMenu from "../../BasicMenu/BasicMenu.jsx";

function IsAuthorized() {
    const user = useSelector(selectUserData);

    return (
        <>
            {user.idToken === null ? (
                <NavLink to={ROUTES.LOGIN} className={styles.loginContainer}>
                    Login <img className={styles.loginIcon} src={loginIcon} alt="loginIcon" />
                </NavLink>
            ) : user.userData.role === 'admin' ? (
                <div>
                    <BasicMenu />
                </div>
            ) : user.userData.role === 'exchanger' ? (
                <div>
                    <Badge className={styles.badge} color="error" variant="dot">
                        <img src={badgeIcon} alt="badgeIcon" />
                    </Badge>
                    <BasicMenu />
                </div>
            ) : (
                <>
                    <NavLink to={ROUTES.ADDLOT} className={styles.newAdBtn}>
                        <div className={styles.newAd}>
                            <Plus />
                            Advertisement
                        </div>
                    </NavLink>
                    <div>
                        <Badge className={styles.badge} color="error" variant="dot">
                            <img src={badgeIcon} alt="badgeIcon" />
                        </Badge>
                    </div>
                    <BasicMenu />
                </>
            )}
        </>
    );
}

export {IsAuthorized};

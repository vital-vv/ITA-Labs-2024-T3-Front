import {ROUTES} from "../../../../../utils/routes.js";
import {NavLink} from "react-router-dom";
import Plus from "../../../../../assets/svg/Plus.jsx";
import BasicMenu from "../../../BasicMenu/BasicMenu.jsx";
import styles from './UserMenu.module.scss';
import {NotificationBadge} from "../NotificationBadge/NotificationBadge.jsx";

function UserMenu() {

    return (
        <>
            <NavLink to={ROUTES.ADDLOT} className={styles.newAdBtn}>
                <div className={styles.newAd}>
                    <Plus/>
                    Advertisement
                </div>
            </NavLink>
            <NotificationBadge/>
            <BasicMenu/>
        </>
    );
}

export {UserMenu};

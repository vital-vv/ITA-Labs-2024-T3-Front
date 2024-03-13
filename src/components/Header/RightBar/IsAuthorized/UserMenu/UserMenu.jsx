import {ROUTES} from "../../../../../utils/routes.js";
import {NavLink} from "react-router-dom";
import Plus from "../../../../../assets/svg/Plus.jsx";
import badgeIcon from '../../../../../assets/images/badgeIcon.png';
import Badge from "@mui/material/Badge";
import BasicMenu from "../../../BasicMenu/BasicMenu.jsx";
import styles from './UserMenu.module.scss';

function UserMenu() {

    return (
        <>
            <NavLink to={ROUTES.ADDLOT} className={styles.newAdBtn}>
                <div className={styles.newAd}>
                    <Plus/>
                    Advertisement
                </div>
            </NavLink>
            <div>
                <Badge className={styles.badge} color="error" variant="dot">
                    <img src={badgeIcon} alt="badgeIcon"/>
                </Badge>
            </div>
            <BasicMenu/>
        </>
    );
}

export {UserMenu};

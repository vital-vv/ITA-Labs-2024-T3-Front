import styles from './AdminHeader.module.scss';
import Badge from '@mui/material/Badge';

import badgeIcon from '../../../assets/images/badgeIcon.png';
import langIcon from '../../../assets/images/langIcon.png';
import usdIcon from '../../../assets/images/usdIcon.png';
import Plus from '../../../assets/svg/Plus.jsx';

import BasicMenu from '../BasicMenu/BasicMenu.jsx';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../../utils/routes.js';

function AdminHeaderBar() {
    return (
        <div className={styles.rightBar}>
            <div>
                <p>USD</p>
                <img alt={usdIcon} src={usdIcon}/>
            </div>
            <div>
                <p>ENG</p>
                <img alt={langIcon} src={langIcon}/>
            </div>
            <NavLink to={ROUTES.ADDLOT}>
                <div className={styles.newAd}>
                    <Plus/>
                    Advertisement
                </div>
            </NavLink>
            <div>
                <Badge className={styles.badge} color="error" variant="dot">
                    <img src={badgeIcon} alt={badgeIcon}/>
                </Badge>
            </div>
            <BasicMenu/>
        </div>
    );
}

export {AdminHeaderBar};

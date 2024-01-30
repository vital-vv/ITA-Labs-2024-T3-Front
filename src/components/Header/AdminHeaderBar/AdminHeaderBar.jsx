import styles from './AdminHeader.module.scss';
import Badge from '@mui/material/Badge';
import badgeIcon from '../../../assets/images/badgeIcon.png';
import BasicMenu from '../BasicMenu/BasicMenu.jsx';

function AdminHeaderBar() {

    return (
        <div className={styles.rightBar}>
            <Badge className={styles.badge} color="error" variant="dot">
                <img src={badgeIcon} alt={badgeIcon}/>
            </Badge>
            <BasicMenu/>
        </div>
    )
}

export {AdminHeaderBar}

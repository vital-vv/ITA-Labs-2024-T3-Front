import styles from './AdminHeader.module.scss';
import Badge from '@mui/material/Badge';
import badgeIcon from '../../../assets/images/badgeIcon.png';
import BasicMenu from '../BasicMenu/BasicMenu.jsx';
import langIcon from '../../../assets/images/langIcon.png';

function AdminHeaderBar() {

    return (
        <div className={styles.rightBar}>
            <div><p>ENG</p><img alt={langIcon} src={langIcon}/></div>
            <div><Badge className={styles.badge} color="error" variant="dot">
                <img src={badgeIcon} alt={badgeIcon}/>
            </Badge></div>

            <BasicMenu/>
        </div>
    )
}

export {AdminHeaderBar}

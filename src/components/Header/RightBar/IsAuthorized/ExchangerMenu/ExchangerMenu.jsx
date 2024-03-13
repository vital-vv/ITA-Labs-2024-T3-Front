import Badge from "@mui/material/Badge";
import BasicMenu from "../../../BasicMenu/BasicMenu.jsx";
import badgeIcon from '../../../../../assets/images/badgeIcon.png';
import styles from './Exchanger.module.scss';

function ExchangerMenu() {

    return (
        <div>
            <Badge className={styles.badge} color="error" variant="dot">
                <img src={badgeIcon} alt="badgeIcon"/>
            </Badge>
            <BasicMenu/>
        </div>
    );
}

export {ExchangerMenu};

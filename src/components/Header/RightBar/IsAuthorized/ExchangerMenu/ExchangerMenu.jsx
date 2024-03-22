import Badge from "@mui/material/Badge";
import BasicMenu from "../../../BasicMenu/BasicMenu.jsx";
import badgeIcon from '../../../../../assets/images/badgeIcon.png';
import styles from './Exchanger.module.scss';
import {NotificationBadge} from "../NotificationBadge/NotificationBadge.jsx";

function ExchangerMenu() {

    return (
        <div>
            <NotificationBadge/>
            <BasicMenu/>
        </div>
    );
}

export {ExchangerMenu};

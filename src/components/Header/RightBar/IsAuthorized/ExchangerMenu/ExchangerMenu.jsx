import BasicMenu from "../../../BasicMenu/BasicMenu.jsx";
import styles from './Exchanger.module.scss';
import {NotificationBadge} from "../NotificationBadge/NotificationBadge.jsx";

function ExchangerMenu() {

    return (
        <>
            <NotificationBadge/>
            <BasicMenu/>
        </>
    );
}

export {ExchangerMenu};

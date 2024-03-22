import Badge from "@mui/material/Badge";
import styles from "./Notifications.module.scss";
import badgeIcon from "../../../../../assets/images/badgeIcon.png";
import {useEffect, useRef, useState} from "react";
import {NotificationItem} from "./NotificationItem/NotificationItem.jsx";
import {notifications} from "../../../../../utils/constants.js";
import { v4 as uuidv4 } from 'uuid';

function NotificationBadge() {

    const [open, setOpen] = useState(false);
    const notificationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notificationRef.current && !notificationRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleBadgeClick = (e) => {
        e.stopPropagation();
        handleClick();
    };

    return (
        <div>
            <Badge className={styles.badge} color="error" variant="dot" onClick={handleBadgeClick}>
                <img src={badgeIcon} alt="badgeIcon" onClick={handleClick}/>
            </Badge>
            {open && (
                <div ref={notificationRef} className={styles.notificationsContainer}>
                    {notifications.map( item => (
                        <NotificationItem key={uuidv4()} title={item.title} description={item.description} type={item.type} img={item.img} />
                    ))}
                </div>
            )}
        </div>
    );
}

export {NotificationBadge};

import styles from './NotificationItem.module.scss';
function NotificationItem({title, description, img}) {

    return (
        <div className={styles.notificationCard}>
            <img className={styles.icon} src={img} alt={img}/>
            <div className={styles.note}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}

export {NotificationItem};

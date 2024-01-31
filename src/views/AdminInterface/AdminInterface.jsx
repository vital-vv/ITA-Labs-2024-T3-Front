import styles from './AdminInterface.module.scss';
import {UserTable} from '../../components/TableOfUsers/UserTable.jsx';

function AdminInterface() {

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminPanel}>
                <UserTable/>
            </div>
        </div>
    )
}

export {AdminInterface}

import styles from './AdminInterface.module.scss';
import Footer from '../../components/Footer/Footer.jsx';

function AdminInterface() {

    return (
        <div className={styles.adminContainer}>
            <p>Admin</p>
            <Footer/>
        </div>
    )
}

export {AdminInterface}

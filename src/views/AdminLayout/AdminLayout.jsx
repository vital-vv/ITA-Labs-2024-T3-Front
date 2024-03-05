import styles from './AdminLayout.module.scss';
import {Outlet} from 'react-router-dom';
import {Header} from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AdminNavigation from "./AdminNavigation/AdminNavigation.jsx";
import { withAuthenticator } from '@aws-amplify/ui-react';

function AdminLayout() {

    return (
        <>
            <Header/>
            <div className={styles.adminPanel}>
                <AdminNavigation/>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

const AdminLayoutWithAuth = withAuthenticator(AdminLayout);
export { AdminLayoutWithAuth as AdminLayout };

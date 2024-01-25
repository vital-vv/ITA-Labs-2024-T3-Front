import styles from './Layout.module.scss';

import {NavLink, Outlet} from 'react-router-dom';
import {Header} from './Header/Header.jsx';

function Layout() {

    return (
        <>
            <Header/>
            <div className={styles.categories}>
                <NavLink to="/">Vegetables</NavLink>
                <NavLink to="/fruits">Fruits</NavLink>
            </div>
            <Outlet/>
            <footer>footer</footer>
        </>
    )
}

export {Layout}
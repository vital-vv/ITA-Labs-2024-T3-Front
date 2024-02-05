import styles from './AdminLayout.module.scss';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getUsers} from '../../features/users/usersSlice.js';
import {NavLink, Outlet} from 'react-router-dom';
import {ROUTES} from '../../utils/routes.js';
import usersIcon from '../../assets/images/users.png';
import betIcon from '../../assets/images/bet.png';
import accountIcon from '../../assets/images/account.png';


function AdminLayout() {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])

    return (
        <div className={styles.adminPanel}>
            <div className={styles.navigation}>
                <NavLink  className={({ isActive }) =>
                     isActive ? styles.active : styles.notActive
                } to={ROUTES.ADMINUSERS}><img src={usersIcon} alt={usersIcon}/><p>All Users</p></NavLink>
                <NavLink  className={({ isActive }) =>
                     isActive ? styles.active : styles.notActive
                } to={ROUTES.ADMINBETS}><img src={betIcon} alt={betIcon}/><p>All Bets</p></NavLink>
                <NavLink  className={({ isActive }) =>
                    isActive ? styles.active : styles.notActive
                } to={ROUTES.HOME}><img src={accountIcon} alt={accountIcon}/><p>My Account</p></NavLink>
            </div>
            <Outlet/>
        </div>
    )
}

export {AdminLayout}

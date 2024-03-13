import styles from './Header.module.scss';
import logo from '../../assets/images/logoIcon.png';
import searchIcon from '../../assets/images/searchIcon.png';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../utils/routes.js';
import {RightBar} from './RightBar/RightBar.jsx';

function Header() {

    return (
        <header>
            <NavLink to={ROUTES.HOME} className={styles.logo}>
                <img alt="logo" src={logo}/>
                <p className={styles.logoName}>AGROEX</p>
            </NavLink>
            <div className={styles.searchBlock}>
                <img src={searchIcon} alt={searchIcon}/>
                <input type="search" name="search" autoComplete="off" onChange={() => {
                }} value="" placeholder="Search"/>
            </div>
            <RightBar/>
        </header>
    )
}

export {Header}

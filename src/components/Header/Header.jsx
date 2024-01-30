import styles from './Header.module.scss';
import logo from '../../assets/images/logoIcon.png';
import currencyIcon from '../../assets/images/currencyIcon.png';
import langIcon from '../../assets/images/langIcon.png';
import loginIcon from '../../assets/images/loginIcon.png';
import searchIcon from '../../assets/images/searchIcon.png';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../utils/routes.js';

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
            <div className={styles.rightBar}>
                <div><p>USD</p><img alt={currencyIcon} src={currencyIcon}/></div>
                <div><p>ENG</p><img alt={langIcon} src={langIcon}/></div>
                <NavLink to={ROUTES.LOGIN}>
                    <div><p>Log in</p><img alt={loginIcon} src={loginIcon}/></div>
                </NavLink>
            </div>
        </header>
    )
}

export {Header}

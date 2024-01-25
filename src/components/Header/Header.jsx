import styles from './Header.module.scss';
import logo from '../../assets/images/logoIcon.png';
import currencyIcon from '../../assets/images/currencyIcon.png';
import langIcon from '../../assets/images/langIcon.png';
import loginIcon from '../../assets/images/loginIcon.png';
import searchIcon from '../../assets/images/searchIcon.png';

function Header() {

    return (
        <header>
            <div className={styles.logo}>
                <img alt="logo" src={logo}/>
                <p className={styles.logoName}>AGROEX</p>
            </div>
            <div className={styles.searchBlock}>
                <img src={searchIcon} alt={searchIcon}/>
                <input type="text" placeholder="Search"/>
            </div>
            <div className={styles.rightBar}>
                <div><div>USD</div><img alt={currencyIcon} src={currencyIcon}/> </div>
                <div><div>ENG</div><img alt={langIcon} src={langIcon}/></div>
                <div><div>Log in</div><img alt={loginIcon} src={loginIcon}/></div>
            </div>
        </header>
    )
}

export {Header}

import styles from './Navigation.module.scss';
import {NavLink} from "react-router-dom";

function Navigation({navTabs}) {
    return (
        <div className={styles.navigation}>
            {navTabs.map((tab, index) => (
                <NavLink
                    key={index}
                    className={({isActive}) =>
                        isActive ? styles.active : styles.notActive
                    }
                    to={tab.path}
                >
                    <img src={tab.icon} alt={tab.icon} />
                    <p>{tab.title}</p>
                </NavLink>
            ))}
        </div>
    );
}

export default Navigation;
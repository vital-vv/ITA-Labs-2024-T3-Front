import styles from './SideBar.module.scss';
import {subCategories} from '../../utils/constants.js';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';

function SideBar() {
    const filtredCategory = subCategories.filter(product => product.category === 'Vegetables');
    return (
        <div className={styles.sideBar}>
            <NavLink to={ROUTES.LOTSLIST}>
            {filtredCategory.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
            </NavLink>
        </div>
    )
}

export {SideBar}

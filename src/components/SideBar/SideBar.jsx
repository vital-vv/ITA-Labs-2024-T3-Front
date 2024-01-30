import styles from './SideBar.module.scss';
import {subCategories} from '../../utils/constants.js';

function SideBar() {
    const filtredCategory = subCategories.filter(product => product.category === 'Vegetables');
    return (
        <div className={styles.sidebar}>
            {filtredCategory.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </div>
    )
}

export {SideBar}

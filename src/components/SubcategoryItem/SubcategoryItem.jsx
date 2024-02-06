import styles from './SubcategoryItem.module.scss';
import {subCategories} from '../../utils/constants.js';

function SubcategoryItem() {

    const filtredCategory = subCategories.filter(product => product.category === 'Vegetables');

    return (
        <>
            {filtredCategory.map((item) => (
                <div key={item.id} className={styles.subcategoryItem}>
                    <img src={item.url} alt={item.id}></img>
                    <div className={styles.subcategoryOpacity}></div>
                    <p className={styles.subcategoryName}>{item.name}</p>
                </div>
            ))}
        </>
    )
}

export {SubcategoryItem}

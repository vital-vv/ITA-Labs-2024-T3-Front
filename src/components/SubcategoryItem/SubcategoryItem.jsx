import styles from './SubcategoryItem.module.scss';
import { subCategories } from '../../utils/constants.js';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';


function SubcategoryItem() {
  const filtredCategory = subCategories.filter(
    (product) => product.category === 'Vegetables'
  );

  return (
    <>
      {filtredCategory.map((item) => (
        <div key={item.id} className={styles.subcategoryItem}>
          <NavLink to={ROUTES.LOTSLIST}>
            <img src={item.url} alt={item.id}></img>
            <div className={styles.subcategoryOpacity}></div>
            <p className={styles.subcategoryName}>{item.name}</p>
          </NavLink>
        </div>
      ))}
    </>
  );
}

export { SubcategoryItem };

import styles from './SubcategoryItem.module.scss';
import { subCategories } from '../../utils/constants.js';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
import {useSelector} from "react-redux";

function SubcategoryItem() {
  const filtredCategory = subCategories.filter(
    (product) => product.category === 'Vegetables'
  );

  let { list } = useSelector(({ subcategories }) => subcategories);
  list = list.subcategories;

  return (
    <>
      {list != null ? list.map((item, index) => (
        <div key={item.category_id} className={styles.subcategoryItem}>
          <NavLink to={ROUTES.LOTSLIST}>
            <img src={filtredCategory[index].url} alt={item.name}></img>
            <div className={styles.subcategoryOpacity}></div>
            <p className={styles.subcategoryName}>{item.name}</p>
          </NavLink>
        </div>
      )) : null}
    </>
  );
}

export { SubcategoryItem };

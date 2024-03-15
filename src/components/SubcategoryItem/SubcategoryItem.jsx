import styles from './SubcategoryItem.module.scss';
import { subCategories } from '../../utils/constants.js';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SubcategoryItem() {
  
  const filtredCategory = subCategories.filter(
    (product) => product.category === 'Vegetables'
  );

  let { list } = useSelector(({ subcategories }) => subcategories);
  list = list.subcategories;

  const location = useLocation();
  let redirect = location.pathname;
  if (redirect === '/') {
    return <Navigate to={'fruits?id=1'}/>
  }

  return (
    <>
      {list != null
        ? list.map((item, index) => (
            <div
              key={item.category_id}
              className={styles.subcategoryItem}
              id={item.category_id}
            >
              <NavLink to={`${redirect}/${item.name.toLowerCase()}?id=${item.category_id}`}>
                <img src={filtredCategory[index].url} alt={item.name}></img>
                <div className={styles.subcategoryOpacity}></div>
                <p className={styles.subcategoryName}>{item.name}</p>
              </NavLink>
            </div>
          ))
        : null}
    </>
  );
}

export { SubcategoryItem };

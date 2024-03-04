import styles from './SubcategoryItem.module.scss';
import { subCategories } from '../../utils/constants.js';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCategory } from '../../features/filter/filterSlice.js';

function SubcategoryItem() {
  const dispatch = useDispatch();

  const filtredCategory = subCategories.filter(
    (product) => product.category === 'Vegetables'
  );

  let { list } = useSelector(({ subcategories }) => subcategories);
  list = list.subcategories;

  const handleMoveToSubcategory = (event) => {
    dispatch(getCurrentCategory(event.currentTarget.id));
  };

  const location = useLocation();
  let redirect = 'lotslist'
  if (location.pathname === '/') {
    redirect = 'fruits/lotslist'
  }

  return (
    <>
      {list != null
        ? list.map((item, index) => (
            <div
              key={item.category_id}
              className={styles.subcategoryItem}
              onClick={handleMoveToSubcategory}
              id={item.category_id}
            >
              <NavLink to={`${redirect}/${item.name.toLowerCase()}`}>
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

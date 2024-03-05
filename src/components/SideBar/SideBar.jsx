import styles from './SideBar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSubcategories } from '../../features/categories/subcategoriesSlice.js';
import { getCurrentCategory } from '../../features/filter/filterSlice.js';

function SideBar() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getSubcategories(currentSubcategory || 1));
  }, [dispatch]);

  let { list } = useSelector(({ subcategories }) => subcategories);
  list = list.subcategories;
  const currentSubcategory = useSelector(state => state.subcategories.list.category_id);

  const handleMoveToSubcategory = (event) => {
    dispatch(getCurrentCategory(event.target.id));
  };

  const location = useLocation();
    let redirect = location.pathname;
  if (location.pathname === '/') {
    redirect = 'fruits'
  }
  

  return (
    <div className={styles.sideBar}>
      {list != null
        ? list.map((item) => (
            <NavLink key={item.category_id} to={`${redirect}/${item.name.toLowerCase()}`}>
              <p
                key={item.category_id}
                onClick={handleMoveToSubcategory}
                id={item.category_id}
              >
                {item.name}{' '}
              </p>
            </NavLink>
          ))
        : null}
    </div>
  );
}

export { SideBar };

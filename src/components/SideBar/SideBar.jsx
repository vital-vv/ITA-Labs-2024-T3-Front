import styles from './SideBar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSubcategories } from '../../features/categories/subcategoriesSlice.js';

function SideBar() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getSubcategories(currentSubcategory || 1));
  }, [dispatch]);

  let { list } = useSelector(({ subcategories }) => subcategories);
  list = list.subcategories;
  const currentSubcategory = useSelector(state => state.subcategories.list.category_id);

  const location = useLocation();
    let redirect = location.pathname;
  if (location.pathname === '/') {
    redirect = 'fruits'
  }
  

  return (
    <div className={styles.sideBar}>
      {list != null
        ? list.map((item) => (
            <NavLink to={`${redirect}/${item.name.toLowerCase()}?id=${item.category_id}`} key={item.category_id}>
              <p
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

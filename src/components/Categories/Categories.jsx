import { useEffect } from 'react';
import { getCategories } from '../../features/categories/categoriesSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesNav } from './CategoriesNav/CategoriesNav.jsx';
import { getSubcategories } from '../../features/categories/subcategoriesSlice.js';

function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { list } = useSelector(({ categories }) => categories);

  function changeRoute(route) {
    return `/${route.toLowerCase()}`;
  }

  const handleGetSubcategory = (event) => {
    dispatch(getSubcategories(event.currentTarget.id));
  };

  if (list.length !== 0) {
    return (
      <>
        <nav>
          {list.map((item, index) => (
            <CategoriesNav
              changeRoute={changeRoute}
              key={item.category_id}
              index={index}
              item={item}
              id={item.category_id}
              getSubcategories={handleGetSubcategory}
            ></CategoriesNav>
          ))}
        </nav>
      </>
    );
  }
}

export { Categories };

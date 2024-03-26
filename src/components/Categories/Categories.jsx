import {useEffect} from 'react';
import {getCategories} from '../../features/categories/categoriesSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {CategoriesNav} from './CategoriesNav/CategoriesNav.jsx';
import {getSubcategories, deleteSubcategories} from '../../features/categories/subcategoriesSlice.js';
import { useLocation } from 'react-router-dom';

function Categories() {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentSubcategory = location.search.substring(4);
    const {list} = useSelector(({categories}) => categories);

    useEffect(() => {
        dispatch(getCategories());  
    }, []);

    useEffect(() => {
        if (list.length !== 0) {
            dispatch(getSubcategories(currentSubcategory))
            return () => {
                dispatch(deleteSubcategories());
            }
        }
    }, [list]);
   
    function changeRoute(route, id) {
        return `/${route.toLowerCase()}?id=${id}`;
    }

    const handleGetSubcategory = (event) => {
        dispatch(getSubcategories(event.currentTarget.id));
    };

    if (list.length !== 0) {
      const defaultTabName = list[0].name;
        return (
            <>
                <nav>
                    {list.map((item, index) => (
                        <CategoriesNav
                            defaultTabName={defaultTabName}
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

export {Categories};

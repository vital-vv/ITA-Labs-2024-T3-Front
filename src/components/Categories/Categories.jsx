import styles from './Categories.module.scss';

import {useEffect} from 'react';
import {getCategories} from '../../features/categories/categoriesSlice.js';
import {useDispatch, useSelector} from 'react-redux';

import {CategoriesNav} from "./CategoriesNav/CategoriesNav.jsx";

function Categories() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const {list} = useSelector(({categories}) => categories);

    function changeRoute(route) {
        return `/${route.toLowerCase()}`
    }

    if (list.length !== 0) {
        return (
            <>
                <nav>
                    {
                        list.map((item, index) => (
                              <CategoriesNav changeRoute={changeRoute} key={item.category_id} index={index} item={item}></CategoriesNav>
                        ))}
                </nav>
            </>
        )
    }
}

export {Categories};

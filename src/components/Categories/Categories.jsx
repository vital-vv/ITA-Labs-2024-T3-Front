import categoryIcon from '../../assets/images/categoryIcon.png';
import styles from './Categories.module.scss';

import {useEffect} from 'react';
import {getCategories} from '../../features/categories/categoriesSlice.js';
import {useDispatch, useSelector} from 'react-redux';

import {NavLink, useNavigate} from "react-router-dom";

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
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? styles.active : isActive ? styles.active : null
                                } key={item.category_id} to={changeRoute(item.name)} id={index} >
                                    <img src={categoryIcon}
                                         alt={categoryIcon}/>
                                    <p> {list[index].name}</p>
                                </NavLink>
                        ))}
                </nav>
            </>
        )
    }
}

export {Categories};

import categoryIcon from '../../assets/images/categoryIcon.png';
import styles from './Categories.module.scss';

import {useEffect} from 'react';
import {getCategories} from '../../features/categories/categoriesSlice.js';
import {useDispatch, useSelector} from 'react-redux';

import {NavLink, useNavigate} from "react-router-dom";
import {ROUTES} from '../../utils/routes.js';
import {getSubcategories} from "../../features/categories/subcategoriesSlice.js";

function Categories() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const {list} = useSelector(({categories}) => categories);

    function changeRoute(route) {
        return `/${route.toLowerCase()}`
    }

    // const navigate = useNavigate();
    // const navigation = (item) => {
    //     console.log(item)
    //     navigate(`/${item.name.toLowerCase()}`, {state: item});
    // }

    if (list.length !== 0) {
        return (
            <>
                <nav>
                    {
                        list.map((item, index) => (
                            // <button key={item.category_id} onClick={() => navigation(item)}>
                                <NavLink key={item.category_id} to={changeRoute(item.name)} id={index} className={styles.category}>
                                    <img src={categoryIcon}
                                         alt={categoryIcon}/>
                                    <p> {list[index].name}</p>
                                </NavLink>
                            // </button>
                        ))}
                </nav>
            </>
        )
    }
}

export {Categories};

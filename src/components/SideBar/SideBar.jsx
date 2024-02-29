import styles from './SideBar.module.scss';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategories} from "../../features/categories/categoriesSlice.js";
import {getSubcategories} from "../../features/categories/subcategoriesSlice.js";

function SideBar() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubcategories(1));
    }, [dispatch]);

    let { list } = useSelector(({ subcategories }) => subcategories);
    list = list.subcategories;

    return (
        <div className={styles.sideBar}>
            <NavLink to={ROUTES.LOTSLIST}>
            {list != null ? list.map((item) => (
                <p key={item.category_id}>{item.name}</p>
            )) : null}
            </NavLink>
        </div>
    )
}

export {SideBar}

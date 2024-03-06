import styles from './CatgoriesContent.module.scss';

import {SideBar} from "../../SideBar/SideBar.jsx";
import {SubcategoryItem} from "../../SubcategoryItem/SubcategoryItem.jsx";

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {deleteSubcategories, getSubcategories} from "../../../features/categories/subcategoriesSlice.js";

function CategoriesContent() {

    const currentSubcategory = useSelector(state => state.subcategories.list.category_id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubcategories(currentSubcategory))
        return () => {
            dispatch(deleteSubcategories());
        }
    }, [dispatch])

    return (
        <div className={styles.homeContent}>
            <SideBar/>
            <main className={styles.categories}>
                <SubcategoryItem/>
            </main>
        </div>
    )
}

export {CategoriesContent}

import styles from './CatgoriesContent.module.scss';

import {SideBar} from "../../SideBar/SideBar.jsx";
import {SubcategoryItem} from "../../SubcategoryItem/SubcategoryItem.jsx";

import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {getSubcategories} from "../../../features/categories/subcategoriesSlice.js";

function CategoriesContent() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubcategories(1))
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

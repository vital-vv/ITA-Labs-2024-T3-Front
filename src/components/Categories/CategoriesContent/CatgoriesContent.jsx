import styles from './CatgoriesContent.module.scss';

import {SideBar} from "../../SideBar/SideBar.jsx";
import {SubcategoryItem} from "../../SubcategoryItem/SubcategoryItem.jsx";

function CategoriesContent() {
    
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

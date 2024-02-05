import styles from './HomePage.module.scss';
import {SideBar} from '../../components/SideBar/SideBar.jsx';
import {Categories} from '../../components/Categories/Categories.jsx';
import {SubcategoryItem} from '../../components/SubcategoryItem/SubcategoryItem.jsx';

function HomePage() {

    return (
        <>
            <Categories/>
            <div className={styles.homeContent}>
                <SideBar/>
                <main className={styles.categories}>
                    <SubcategoryItem/>
                </main>
            </div>
        </>
    )
}

export {HomePage}

import styles from './Homepage.module.scss';
import {SideBar} from '../../components/SideBar/SideBar.jsx';
import {Categories} from '../../components/Categories/Categories.jsx';
import {SubcategoryItem} from '../../components/SubcategoryItem/SubcategoryItem.jsx';


function Homepage() {

    return (
        <>
            <Categories/>
            <div className={styles.homeContent}>
                <SideBar/>
                <main>
                    <SubcategoryItem/>
                </main>
            </div>
        </>
    )
}

export {Homepage}

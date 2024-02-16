import styles from './SideBar.module.scss';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
import {useSelector} from "react-redux";

function SideBar() {

    let { list } = useSelector(({ subcategories }) => subcategories);
    console.log(list)

    return (
        <div className={styles.sideBar}>
            {/*<NavLink to={ROUTES.LOTSLIST}>*/}
            {/*{list != null ? list.map((item) => (*/}
            {/*    <p key={item.category_id}>{item.name}</p>*/}
            {/*)) : null}*/}
            {/*</NavLink>*/}
        </div>
    )
}

export {SideBar}

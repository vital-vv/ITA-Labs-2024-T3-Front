import { useDispatch, useSelector } from 'react-redux';
import categoryIcon from '../../assets/images/categoryIcon.png';
import styles from './Categories.module.scss';
import { useEffect } from 'react';
import { getCategories } from '../../features/categories/categoriesSlice.js';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
// import {NavItem} from "../NavItem/NavItem.jsx";

function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { list } = useSelector(({ categories }) => categories);

    if (list.length !== 0) {
        return (
            <>
                <nav>
                    {
                        list.map((_,index) => (
                            <div id={index} key={list[index].id} className={styles.category}>
                                <img src={categoryIcon}
                                     alt={categoryIcon}/>
                                <p> {list[index].name}</p></div>
                        ))}
                </nav>
            </>
        )
    }
}

export { Categories };

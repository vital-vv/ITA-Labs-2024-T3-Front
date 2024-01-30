import {useDispatch, useSelector} from 'react-redux';
import categoryIcon from '../../assets/images/categoryIcon.png';
import styles from './Categories.module.scss';
import {useEffect} from 'react';
import {getCategories} from '../feauters/categories/categoriesSlice.js';

function Categories() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const {list} = useSelector(({categories}) => categories);

    if (list.length !== 0) {
        return (
            <>
                <nav className={styles.categories}>
                    {/*{*/}
                    {/*    list.map((_,index) => (*/}
                    {/*        <div key={list[index].id} className={styles.category}>*/}
                    {/*            <img src={categoryIcon}*/}
                    {/*                 alt={categoryIcon}/>*/}
                    {/*            <p> {list[index].name}</p></div>*/}
                    {/*    ))}*/}

                    <div className={`${styles.category} ${styles.active}`}><img
                        src={categoryIcon}
                        alt={categoryIcon}/>
                        <p>Vegetables</p></div>
                    <div className={styles.category}><img
                        src={categoryIcon}
                        alt={categoryIcon}/>
                        <p>Fruits</p></div>
                    <div className={styles.category}><img
                        src={categoryIcon}
                        alt={categoryIcon}/>
                        <p>Crops</p></div>
                    <div className={styles.category}><img
                        src={categoryIcon}
                        alt={categoryIcon}/>
                        <p>Dry fruits</p></div>
                </nav>
            </>
        )
    }
}

export {Categories}

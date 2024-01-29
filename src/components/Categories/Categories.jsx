import {NavLink} from 'react-router-dom';
import categoryIcon from '../../assets/images/categoryIcon.png';
import styles from './Categories.module.scss';
function Categories() {

    return (
        <>
            <nav className={styles.categories}>
                <NavLink  className={({ isActive }) =>
                    isActive ? styles.active : ''}   to="/"><img src={categoryIcon} alt={categoryIcon}/> <p>Vegetables</p></NavLink>
                <NavLink  className={({ isActive }) =>
                    isActive ? styles.active : ''} to="/fruits"><img src={categoryIcon} alt={categoryIcon}/><p>Fruits</p></NavLink>
                <NavLink  className={({ isActive }) =>
                    isActive ? styles.active : ''} to="/crops"><img src={categoryIcon} alt={categoryIcon}/><p>Crops</p></NavLink>
                <NavLink  className={({ isActive }) =>
                    isActive ? styles.active : ''} to="/dryfruits"><img src={categoryIcon} alt={categoryIcon}/><p>Dry fruits</p></NavLink>
            </nav>
        </>
    )
}


export {Categories}

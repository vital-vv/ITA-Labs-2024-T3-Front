import { NavLink } from 'react-router-dom';
import styles from '../Categories.module.scss';
import categoryIcon from '../../../assets/images/categoryIcon.png';

function CategoriesNav({ item, id, changeRoute, getSubcategories, defaultTabName }) {
  return (
      <NavLink
          className={({ isActive, isPending }) =>
              (isPending || (isActive && item.name === defaultTabName)) ? styles.active : null}
          to={changeRoute(item.name)}
          id={id}
          onClick={getSubcategories}
      >
          <img src={categoryIcon} alt={categoryIcon}/>
          <p> {item.name} </p>
      </NavLink>
  );
}

export { CategoriesNav };

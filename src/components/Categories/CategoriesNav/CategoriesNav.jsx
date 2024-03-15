import { NavLink } from 'react-router-dom';
import styles from '../Categories.module.scss';
import categoryIcon from '../../../assets/images/categoryIcon.png';

function CategoriesNav({
  item,
  id,
  changeRoute,
  getSubcategories,
}) {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isPending || isActive ? styles.active : null
      }
      to={changeRoute(item.name, id)}
      id={id}
      onClick={getSubcategories}
    >
      <img src={categoryIcon} alt={categoryIcon} />
      <p> {item.name} </p>
    </NavLink>
  );
}

export { CategoriesNav };

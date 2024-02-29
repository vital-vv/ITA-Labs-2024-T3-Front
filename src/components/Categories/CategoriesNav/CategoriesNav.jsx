import {NavLink} from "react-router-dom";
import styles from "../Categories.module.scss";
import categoryIcon from "../../../assets/images/categoryIcon.png";

function CategoriesNav({item, index, changeRoute}) {

  return (
      <NavLink className={({ isActive, isPending }) =>
          isPending ? styles.active : isActive ? styles.active : null
      } key={item.category_id} to={changeRoute(item.name)} id={index} >
          <img src={categoryIcon}
               alt={categoryIcon}/>
          <p> {item.name}</p>
      </NavLink>
  )
}

export {CategoriesNav};

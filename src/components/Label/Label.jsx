import ByLists from '../../assets/svg/ByLists';
import ByWindows from '../../assets/svg/ByWindows';
import classes from './label.module.scss';
import { useSelector } from 'react-redux';

function Label() {
  const currentCategory = useSelector(state => state.filter.currentCategory);

  return (
    <div className={classes.label}>
      <div>
        <div className={classes.bigLabel}>{currentCategory}</div>
      </div>
      <div className={classes.buttons}>
        <button>
          <ByLists/>
        </button>
        <button>
         <ByWindows/> 
        </button>
      </div>
    </div>
  );
}

export default Label;

import ByLists from '../../assets/svg/ByLists';
import ByWindows from '../../assets/svg/ByWindows';
import BredCrumbs from '../BredCrumbs/BredCrumbs';
import classes from './label.module.scss';

function Label() {
  return (
    <div className={classes.label}>
      <div>
        <BredCrumbs/>
        <div className={classes.bigLabel}>Apples</div>
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

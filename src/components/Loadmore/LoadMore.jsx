import ArrowDownBig from '../../assets/svg/ArrowDownBig';
import ArrowDownSmall from '../../assets/svg/ArrowDownSmall';
import classes from './LoadMore.module.scss'

function LoadMore() {
  return (
    <div className={classes.load}>
      <div className={classes.buttonForLoad}>
        <span>
          <ArrowDownBig/>
        </span>
        <span>Load more variants</span>
      </div>
      <div className={classes.page}>
        <span>1</span>
        <span>
          <ArrowDownSmall/>
        </span>
      </div>
    </div>
  );
}

export default LoadMore;
import classes from './BredCrumbs.module.scss'

function BredCrumbs() {
  return (
    <div className={classes.bredCrumbs}>
      <span className={classes.firstCategory}>Categories</span>
      <span>&gt;</span>
      <span className={classes.nextCategory}>Apples</span>
      <span>&gt;</span>
      <span className={classes.nextCategory}>Apples</span>
    </div>
  );
}

export default BredCrumbs;
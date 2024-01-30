import classes from './ButtonFilter.module.scss';
import Close from '../../assets/svg/Close.jsx';

const ButtonFilter = () => {
  return (
    <>
      <div className={classes.buttonFilter}>Apply filter</div>
      <div className={classes.close}>
        <Close />
      </div>
    </>
  );
};
export default ButtonFilter;

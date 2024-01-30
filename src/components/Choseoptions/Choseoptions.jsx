import classes from './ChoseOptions.module.scss';
import Selector from '../Selector/Selector'
import DeleteOption from '../../assets/svg/DeleteOption';

function ChoseOptions() {
  return (
    <div className={classes.chosenOptions}>
      <div>
        <p>champion</p>
        <p>
          <DeleteOption/>
        </p>
      </div>
      <Selector />
    </div>
  );
}

export default ChoseOptions;

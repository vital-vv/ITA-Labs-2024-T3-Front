import ArrowRight from '../../assets/svg/ArrowRight';
import classes from './MoreFilter.module.scss';
import ElementForFilter from '../ElementForFilter/ElementForFilter';
import { v4 as uuidv4 } from 'uuid';
import Close from '../../assets/svg/Close';

const MoreFilter = ({
  options,
  isOpenModal,
  setOpenModal,
  arrayForShowModal,
}) => {
  const fillContainer = (array) => {
    return array.map((item) => (
      <ElementForFilter
        name={item.name}
        key={uuidv4()}
        id={item.id}
        isChecked={item.isChecked}
      />
    ));
  };

  return (
    <div className={classes.more}>
      <label>All {options} options</label>
      <button onClick={setOpenModal}>
        <ArrowRight />
      </button>
      <div className={!isOpenModal ? classes.hidden : classes.modal}>
        {fillContainer(arrayForShowModal)}
        <div className={classes.closeModal} onClick={setOpenModal}>
          <Close />
        </div>
      </div>
    </div>
  );
};

export default MoreFilter;

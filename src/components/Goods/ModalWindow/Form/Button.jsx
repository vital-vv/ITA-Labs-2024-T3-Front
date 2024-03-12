import { useDispatch, useSelector } from 'react-redux';
import styles from './Button.module.scss';
import { useField } from 'formik';
import { confirmBid } from '../../../../features/lots/lotsSlice';

function Button({ children, isValid, isDirty, btnText, id, ...props }) {
  const [meta] = useField(props);
  const { currentBid } = useSelector((state) => state.lots);
  const dispatch = useDispatch();

  const handleAddBid = (event) => {
    const bidData = {
      user_id: 1, //Still HARDCODE!!!
      lot_id: event.target.id,
      amount: currentBid,
      currency: 'USD', //Still HARDCODE!!!, send preferred currency
    };
    dispatch(confirmBid(bidData));
  };

  return (
    <button
      disabled={!(isValid && isDirty)}
      type="submit"
      className={styles.button}
      id={id}
      onClick={handleAddBid}
    >
      {!(isValid && isDirty) ? (
        <p>{btnText}</p>
      ) : (
        <p>
          {btnText} $ {meta.value.totalAmount}
        </p>
      )}
      {}
    </button>
  );
}

export { Button };

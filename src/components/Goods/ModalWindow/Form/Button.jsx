import { useDispatch, useSelector } from 'react-redux';
import styles from './Button.module.scss';
import { useField } from 'formik';
import { confirmBid } from '../../../../features/lots/lotsSlice';

function Button({ children, isValid, isDirty, btnText, onClose, ...props }) {
  const [meta] = useField(props);
  const { currentBid } = useSelector((state) => state.lots);
  const dispatch = useDispatch();

  const {idForBid} = useSelector(state => state.lots)
  
  const handleAddBid = () => {
    const bidData = {
      lot_id: idForBid, 
      amount: currentBid,
      currency: 'USD', //Still HARDCODE!!!, send preferred currency
    };
    dispatch(confirmBid(bidData));
    onClose();
  };



  return (
    <button
      disabled={!(isValid && isDirty)}
      type="submit"
      className={styles.button}
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

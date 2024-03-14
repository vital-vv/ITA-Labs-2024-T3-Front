import { useEffect } from 'react';
import styles from './Input.module.scss';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { addNewBid, resetState } from '../../../../features/lots/lotsSlice';

function Input({ id, label, name, placeholder, disabled }) {
  const { values } = useFormikContext();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(addNewBid(values.totalAmount))
    return () => {
      dispatch(resetState());
    }
  },[dispatch, values])

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <Field
        disabled={disabled}
        name={name}
        id={id}
        placeholder={placeholder}
      />
      <ErrorMessage name={name}>{(error) => <span>{error}</span>}</ErrorMessage>
    </div>
  );
}

export { Input };

import styles from './Input.module.scss';
import {ErrorMessage, Field} from "formik";

function Input({id, label, name, placeholder, disabled}) {
    return (
      <div className={styles.inputContainer}>
          <label htmlFor={id}>{label}</label>
          <Field disabled={disabled} name={name} id={id} placeholder={placeholder}/>
          <ErrorMessage name={name}>{(error) => <span>{error}</span>}</ErrorMessage>
      </div>
    );
}

export {Input};

import styles from './Button.module.scss';
import {useField} from "formik";

function Button({children, isValid, isDirty, btnText, ...props}) {

    const [meta] = useField(props);

    return (
        <button disabled={!(isValid && isDirty)} type="submit" className={styles.button}>
            {!(isValid && isDirty)? <p>{btnText}</p> : <p>{btnText} $ {meta.value.totalAmount}</p>}
            {}
        </button>
    );
}

export {Button};

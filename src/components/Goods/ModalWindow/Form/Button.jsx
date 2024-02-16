import styles from './Button.module.scss';

function Button({children, isValid}) {
    return (
        <button disabled={!isValid} type="submit" className={styles.button}>{children}</button>
    );
}

export {Button};

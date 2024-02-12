import editIcon from '../../../assets/images/editIconGreen.png';
import deleteIcon from '../../../assets/images/deleteIcon.png';
import styles from './ButtonGroup.module.scss';

import PropTypes from 'prop-types';

ButtonGroup.propTypes = {
    display: PropTypes.string,
};

function ButtonGroup({display}) {
    if (display === 'create') {
        return <button className={`${styles.btn} ${styles.greenBtn}`} disabled={true}>Create user</button>
    } else if (display === 'edit') {
        return (
            <>
                <button className={`${styles.btn} ${styles.greenBtn}`}>
                    <img src={editIcon} alt={editIcon}/>
                    <p>Edit data</p>
                </button>
                <button className={`${styles.btn} ${styles.redBtn}`}>
                    <img src={deleteIcon} alt={deleteIcon}/>
                    <p>Delete user</p>
                </button>
            </>
        )
    }
}

export {ButtonGroup}
import styles from './UserEditor.module.scss';
import editIcon from '../../assets/images/editIconGreen.png';
import deleteIcon from '../../assets/images/deleteIcon.png';
import InputContainerUser from '../InputContainerUser/InputContainerUser';

function UserEditor() {

    return (
        <div className={styles.userEditorWindow}>
            <div className={styles.userBox}>
                <div className={styles.editTitle}>
                    Personal data of
                    <span>Sam Foster</span>
                </div>
                <div className={styles.userData}>
                    <div className={styles.avatar}>
                        <div className={styles.nickname}>SF</div>
                    </div>
                    <div>
                        <InputContainerUser/>
                        <div className={styles.groupBtn}>
                            <button className={`${styles.btn} ${styles.editBtn}`}>
                                <img src={editIcon} alt={editIcon}/>
                                <p>Edit data</p>
                            </button>
                            <button className={`${styles.btn} ${styles.deleteBtn}`}>
                                <img src={deleteIcon} alt={deleteIcon}/>
                                <p>Delete user</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {UserEditor}

import styles from './UserEditor.module.scss';
import {UserDataInputs} from '../UserDataInputs/UserDataInputs.jsx';

function UserEditor() {

    return (
        <div className={styles.userEditorWindow}>
            <UserDataInputs display={'edit'} title={<>Edit data of <span>Sam Foster</span></>}/>
        </div>
    )
}

export {UserEditor}

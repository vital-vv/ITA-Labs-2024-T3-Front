import styles from './UserCreator.module.scss';
import {UserDataInputs} from '../UserDataInputs/UserDataInputs.jsx';

function UserCreator() {

    return (
        <div className={styles.userEditorWindow}>
           <UserDataInputs display={'create'} title={'Creating a new user'}/>
        </div>
    )
}

export {UserCreator}

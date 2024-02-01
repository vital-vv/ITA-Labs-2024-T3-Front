import styles from './AdminInterface.module.scss';
import {UserTable} from '../../components/TableOfUsers/UserTable.jsx';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getUsers} from '../../features/users/usersSlice.js';

function AdminInterface() {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])

    return (
        <div className={styles.adminPanel}>
            <UserTable/>
        </div>
    )
}

export {AdminInterface}

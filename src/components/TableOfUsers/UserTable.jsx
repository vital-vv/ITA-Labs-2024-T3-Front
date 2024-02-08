import styles from './UserTable.module.scss';
import editIcon from '../../assets/images/editIcon.png'

import {Link, NavLink} from 'react-router-dom';
import {ROUTES} from '../../utils/routes.js';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {getUsers} from '../../features/users/usersSlice.js';
import {PaginationControlled} from '../Pagination/Pagination.jsx';

function UserTable() {
    const [page, setPage] = useState(1);


    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUsers(page))
    },[dispatch, page])

    const {list} = useSelector(({users}) => users);

        return (
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(({user_id, first_name, last_name, role})=>(
                        <tr key={user_id}>
                            <td>{user_id}</td>
                            <td>{first_name}</td>
                            <td>{last_name}</td>
                            <td>{role}</td>
                            <td><NavLink to={ROUTES.USERINFO}><img src={editIcon} alt={editIcon}/></NavLink></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <PaginationControlled setPage={setPage} page={page}/>
                <Link to={ROUTES.ADMINCREATEUSER} className={styles.createUserBtn}>Create new user</Link>
            </div>
        )
}

export {UserTable}

import styles from './UserTable.module.scss';
import editIcon from '../../assets/images/editIcon.png'
import {Link, NavLink} from 'react-router-dom';
import {ROUTES} from '../../utils/routes.js';
import {useSelector} from 'react-redux';

function UserTable() {

    const {list} = useSelector(({users}) => users);

    if (list.length !== 0) {
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
                    {list.map(({id, name, password, role})=>(
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{password}</td>
                            <td>{role}</td>
                            <td><NavLink to={ROUTES.USERINFO}><img src={editIcon} alt={editIcon}/></NavLink></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to={ROUTES.HOME} className={styles.createUserBtn}>Create new user</Link>
            </div>
        )
    }
}

export {UserTable}

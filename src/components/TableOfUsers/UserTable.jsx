import styles from './UserTable.module.scss';
import editIcon from '../../assets/images/editIcon.png'
import {Link} from 'react-router-dom';
import {ROUTES} from '../../utils/routes.js';
import {useSelector} from 'react-redux';

function UserTable() {

    const {list} = useSelector(({users}) => users);

    if (list.length !== 0) {
        return (
            <>
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th className={styles.tableColMrg} scope="col">First Name</th>
                        <th className={styles.tableColMrg} scope="col">Last Name</th>
                        <th className={styles.tableColMrg} scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(({id, name, password, role})=>(
                        <tr key={id}>
                            <td>{id}</td>
                            <td className={styles.tableMrg}>{name}</td>
                            <td className={styles.tableMrg}>{password}</td>
                            <td className={styles.tableMrg} >{role}</td>
                            <td><img src={editIcon} alt={editIcon}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Link to={ROUTES.HOME} className={styles.createUserBtn}>Create new user</Link>
            </>
        )
    }
}

export {UserTable}

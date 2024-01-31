import styles from './UserTable.module.scss';
import editIcon from '../../assets/images/editIcon.png'
import {Link} from 'react-router-dom';
import {ROUTES} from '../../utils/routes.js';

function UserTable() {

    return (
        <>
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
                <tr>
                    <td>1</td>
                    <td>Jake</td>
                    <td>Woodstoke</td>
                    <td>Administrator</td>
                    <td><img src={editIcon} alt={editIcon}/></td>

                </tr>
                <tr>
                    <td>2</td>
                    <td>Elizabeth</td>
                    <td>Trone</td>
                    <td>User</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Jimmy</td>
                    <td>Elison</td>
                    <td>Traidor</td>
                    <td><img src={editIcon} alt={editIcon}/></td>
                </tr>
                </tbody>
            </table>
            <Link to={ROUTES.HOME} className={styles.createUserBtn}>Create new user</Link>
        </>
    )
}

export {UserTable}

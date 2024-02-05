import {Routes, Route} from 'react-router-dom';
import {HomePage} from '../../views/HomePage/HomePage.jsx';
import {AdminLayout} from '../../views/AdminLayout/AdminLayout.jsx';
import {UserTable} from '../TableOfUsers/UserTable.jsx';
import {UserEditor} from '../UserEditor/UserEditor.jsx';
import {AllBets} from '../AllBets/AllBets.jsx';

function AppRoutes() {

    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/admin/*" element={<AdminLayout/>}>
                <Route path="users" element={<UserTable/>}/>
                <Route path="users/:id" element={<UserEditor/>}/>
                <Route path="bets" element={<AllBets/>}/>
            </Route>
        </Routes>
    )
}

export {
    AppRoutes
}

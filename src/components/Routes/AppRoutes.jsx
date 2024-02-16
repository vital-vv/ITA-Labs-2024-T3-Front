import {Routes, Route} from 'react-router-dom';
import {HomePage} from '../../views/HomePage/HomePage.jsx';
import {AdminLayout} from '../../views/AdminLayout/AdminLayout.jsx';
import {UserTable} from '../TableOfUsers/UserTable.jsx';
import {UserEditor} from '../UserData/UserEditor/UserEditor.jsx';
import {AllBets} from '../AllBets/AllBets.jsx';
import Account from '../Account/Account.jsx';
import LotsList from '../Lotslist/Lotslist.jsx';
import LotView from '../LotView/LotView.jsx';
import { ROUTES } from '../../utils/routes.js';
import {UserCreator} from '../UserData/UserCreator/UserCreator.jsx';
import AddLot from '../AddLot/AddLot.jsx';
import {CategoriesContent} from "../Categories/CategoriesContent/CatgoriesContent.jsx";

function AppRoutes() {

    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage/>}>
                <Route index element={<CategoriesContent/>} />
                <Route path="/:category" element={<CategoriesContent/>} />
            </Route>
            <Route path={ROUTES.LOTSLIST} element={<LotsList />} />
            <Route path={ROUTES.LOTVIEW} element={<LotView />} />
            <Route path={ROUTES.ADDLOT} element={<AddLot />} />
            <Route path="/admin/*" element={<AdminLayout/>}>
                <Route path="users" element={<UserTable/>}/>
                <Route path="users/create" element={<UserCreator/>}/>
                <Route path="users/:id" element={<UserEditor/>}/>
                <Route path="bets" element={<AllBets/>}/>
                <Route path="account" element={<Account/>}/>
            </Route>
        </Routes>
    )
}

export { AppRoutes };

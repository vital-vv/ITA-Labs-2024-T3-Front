import {Routes, Route} from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
import {HomePage} from '../../views/HomePage/HomePage.jsx';
import {AdminLayout} from '../../views/AdminLayout/AdminLayout.jsx';
import {UserTable} from '../TableOfUsers/UserTable.jsx';
import {UserEditor} from '../UserData/UserEditor/UserEditor.jsx';
import {AllBets} from '../AllBets/AllBets.jsx';
import Account from '../Account/Account.jsx';
import LotsList from '../Lotslist/Lotslist.jsx';
import LotView from '../LotView/LotView.jsx';
import {UserCreator} from '../UserData/UserCreator/UserCreator.jsx';
import AddLot from '../AddLot/AddLot.jsx';
import Preview from '../../hoc/Preview/Preview.jsx';
import Lots from '../../hoc/Lots/Lots.jsx';
import Finish from '../../hoc/Finish/Finish.jsx';
import Success from '../../hoc/Success/Success.jsx';
import StateAdd from '../../hoc/StateAdd/StateAdd.jsx';
import Failed from '../../hoc/Failed/Failed.jsx';
import {CategoriesContent} from "../Categories/CategoriesContent/CatgoriesContent.jsx";
import {Onboarding} from "../Onboarding/Onboarding.jsx";
import {Registration} from "../Onboarding/Registration/Registration.jsx";
import {SignInApp} from "../SignIn/SignInApp.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<SignInApp/>}/>
      <Route path={ROUTES.ONBOARDING} element={<Onboarding/>}/>
      <Route path={ROUTES.REGISTRATION} element={<Registration/>}/>
      <Route path={ROUTES.HOME} element={<HomePage/>}>
        <Route index element={<CategoriesContent/>} />
        <Route path="/:category" element={<CategoriesContent />}  />
      </Route>
        <Route path="lotslist/*" element={<Lots />}>
        <Route index element={<LotsList />} />
        <Route path="lotview" element={<LotView />} />
      </Route>
      <Route path="/addlot/*" element={<Lots />}>
        <Route index element={<AddLot />} />
        <Route path="preview" element={<Preview />} />
        <Route path="finish" element={<Finish />} />
      </Route>
      <Route path="addlot/success" element={<StateAdd />} >
        <Route index element={<Success />} />
      </Route>
      <Route path="addlot/failed" element={<StateAdd />} >
        <Route index element={<Failed />} />
      </Route>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="users" element={<UserTable />} />
        <Route path="users/create" element={<UserCreator />} />
        <Route path="users/:id" element={<UserEditor />} />
        <Route path="bets" element={<AllBets />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export { AppRoutes };

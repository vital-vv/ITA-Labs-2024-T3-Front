import {Routes,Route} from 'react-router-dom';
import {HomePage} from '../../views/HomePage/HomePage.jsx';
import {AdminInterface} from '../../views/AdminInterface/AdminInterface.jsx';
import {ROUTES} from '../../utils/routes.js';

function AppRoutes() {

    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path={ROUTES.ADMIN} element={<AdminInterface/>}/>
        </Routes>
    )
}

export {AppRoutes}

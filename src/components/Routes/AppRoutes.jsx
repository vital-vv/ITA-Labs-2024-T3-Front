import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../views/HomePage/HomePage.jsx';
import { AdminInterface } from '../../views/AdminInterface/AdminInterface.jsx';
import { ROUTES } from '../../utils/routes.js';
import LotsList from '../Lotslist/Lotslist.jsx';
import LotView from '../LotView/LotView.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.ADMIN} element={<AdminInterface />} />
      <Route path={ROUTES.LOTSLIST} element={<LotsList />} />
      <Route path={ROUTES.LOTVIEW} element={<LotView />} />
    </Routes>
  );
}

export { AppRoutes };

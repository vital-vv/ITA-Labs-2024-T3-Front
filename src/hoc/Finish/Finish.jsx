import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';

function Finish() {
  const {isProcess, isSuccessAdding} = useSelector((state) => state.lots);
  const location = useLocation();

  if (!isProcess) {
    return <Navigate to={isSuccessAdding ? ROUTES.SUCCESSADD : ROUTES.FAILEDADD} state={{ from: location }} />;
  }
  return <Loader />;
}

export default Finish;

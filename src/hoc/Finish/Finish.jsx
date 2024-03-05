import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
import {withAuthenticator} from "@aws-amplify/ui-react";

function Finish() {
  const {isProcess, isSuccessAdding} = useSelector((state) => state.lots);

  if (!isProcess) {
    return <Navigate to={isSuccessAdding ? ROUTES.SUCCESSADD : ROUTES.FAILEDADD}/>;
  }
  return <Loader />;
}

export { Finish };

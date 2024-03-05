import { useSelector } from 'react-redux';
import LotView from '../../components/LotView/LotView';
import { Navigate, useLocation } from 'react-router-dom';
import {withAuthenticator} from "@aws-amplify/ui-react";
import Lots from "../Lots/Lots.jsx";

function Preview() {
  const isFormComplete = useSelector(state => state.lots.fullValidationForm);
  const location = useLocation();

  if (!isFormComplete) {
    return <Navigate to={'/login'} state={{from: location}} />
      }

  return (
      <LotView />
  );
}
// const PreviewWithAuth = withAuthenticator(Preview);
//
// export { PrWithAuth as AdminLayout };
export default Preview;

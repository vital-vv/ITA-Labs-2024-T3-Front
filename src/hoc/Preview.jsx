import { useSelector } from 'react-redux';
import LotView from '../components/LotView/LotView';
import { Navigate, useLocation } from 'react-router-dom';

function Preview() {
  const isFormComplete = useSelector(state => state.lots.fullValidationForm);
  const location = useLocation();

  if (!isFormComplete) {
    return <Navigate to={'/addlot'} state={{from: location}} />
      }

  return (
      <LotView />
  );
}

export default Preview;

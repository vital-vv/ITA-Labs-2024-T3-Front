import ArrowLeft from '../../assets/svg/ArrowLeft';
import { useNavigate } from 'react-router-dom';

function OneStepBack() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div onClick={goBack}>
      <ArrowLeft />
    </div>
  );
}

export default OneStepBack;

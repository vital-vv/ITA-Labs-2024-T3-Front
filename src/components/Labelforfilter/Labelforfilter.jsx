import QuestionMark from '../../assets/svg/QuestionMark';
import classes from './LabelForFilter.module.scss';

const LabelForFilter = (props) => {
  return (
    <div className={classes.variety}>
      <p>{props.name}</p>
      <span>
        <QuestionMark/>
      </span>
    </div>
  );
};

export default LabelForFilter;

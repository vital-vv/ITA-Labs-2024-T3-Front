import classes from './Choseoptions.module.scss';
import Selector from '../Selector/Selector'

function ChoseOptions() {
  return (
    <div className={classes.chosenoptions}>
      <div>
        <p>champion</p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
          >
            <path
              d="M17.67 5.17534L16.4947 4L11.835 8.65966L7.17534 4L6 5.17534L10.6597 9.835L6 14.4947L7.17534 15.67L11.835 11.0103L16.4947 15.67L17.67 14.4947L13.0103 9.835L17.67 5.17534Z"
              fill="#798787"
            />
          </svg>
        </p>
      </div>
      <Selector />
    </div>
  );
}

export default ChoseOptions;

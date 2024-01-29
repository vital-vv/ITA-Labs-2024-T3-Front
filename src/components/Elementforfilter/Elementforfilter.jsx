import { useState } from 'react';
import classes from './ElementForFilter.module.scss';

const ElementForFilter = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const toogleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <p className={classes.allElement}>
        <div className={classes.boxInput}>
          {isChecked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="28"
              viewBox="0 0 24 28"
              fill="none"
              onClick={toogleCheckbox}
            >
              <path
                d="M9 13L12 16L23 5"
                stroke="#51ACAE"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 13.75V20.5556C20.5 21.6289 19.6289 22.5 18.5556 22.5H4.94444C3.87111 22.5 3 21.6289 3 20.5556V6.94444C3 5.87111 3.87111 5 4.94444 5H15.6389"
                stroke="#51ACAE"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="28"
              viewBox="0 0 24 28"
              fill="none"
              onClick={toogleCheckbox}
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="18"
                rx="3"
                stroke="#798787"
                stroke-width="2"
              />
            </svg>
          )}
        </div>
        <p htmlFor={props.id} onClick={toogleCheckbox}>
          {props.name}
        </p>
      </p>
    </div>
  );
};

export default ElementForFilter;
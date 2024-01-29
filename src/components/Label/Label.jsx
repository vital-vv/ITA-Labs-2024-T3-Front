import classes from './label.module.scss';

function Label() {
  return (
    <div className={classes.label}>
      <div>
        <div className={classes.bredcrumbs}>
          <span className={classes.firstcategory}>Categories</span>
          <span>&gt;</span>
          <span className={classes.secondcategory}>Apples</span>
        </div>
        <div className={classes.biglabel}>Apples</div>
      </div>
      <div className={classes.buttons}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.16667 3.33301H17.5V4.99967H9.16667V3.33301ZM9.16667 6.66634H14.1667V8.33301H9.16667V6.66634ZM9.16667 11.6663H17.5V13.333H9.16667V11.6663ZM9.16667 14.9997H14.1667V16.6663H9.16667V14.9997ZM2.5 3.33301H7.5V8.33301H2.5V3.33301ZM4.16667 4.99967V6.66634H5.83333V4.99967H4.16667ZM2.5 11.6663H7.5V16.6663H2.5V11.6663ZM4.16667 13.333V14.9997H5.83333V13.333H4.16667Z"
              fill="#51ACAE"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.5 2.5H9.16667V9.16667H2.5V2.5ZM2.5 10.8333H9.16667V17.5H2.5V10.8333ZM10.8333 2.5H17.5V9.16667H10.8333V2.5ZM10.8333 10.8333H17.5V17.5H10.8333V10.8333ZM12.5 4.16667V7.5H15.8333V4.16667H12.5ZM12.5 12.5V15.8333H15.8333V12.5H12.5ZM4.16667 4.16667V7.5H7.5V4.16667H4.16667ZM4.16667 12.5V15.8333H7.5V12.5H4.16667Z"
              fill="#131314"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Label;

import classes from '../assets/styles/LoadMore.module.scss'

function LoadMore() {
  return (
    <div className={classes.load}>
      <div className={classes.buttonForLoad}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M12.5007 13.1717L17.4507 8.22168L18.8647 9.63568L12.5007 15.9997L6.13672 9.63568L7.55072 8.22168L12.5007 13.1717Z"
              fill="#51ACAE"
            />
          </svg>
        </span>
        <span>Load more variants</span>
      </div>
      <div className={classes.page}>
        <span>1</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 14L8 10H16L12 14Z" fill="#131314" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default LoadMore;

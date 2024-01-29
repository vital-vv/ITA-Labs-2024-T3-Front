import classes from './Morefilter.module.scss';

const MoreFilter = (props) => {
  return (
    <div className={classes.more}>
      <label>All {props.options} options</label>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M14 12L10 16V8L14 12Z" fill="#131314" />
        </svg>
      </button>
    </div>
  );
};

export default MoreFilter;

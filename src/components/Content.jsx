import Filter from './Filter';
import Main from './Main';
import classes from '../assets/styles/Content.module.scss';
import LoadMore from './LoadMore';

const Content = () => {
  return (
    <div>
      <main>
        <Filter classname={classes.filter} />
        <Main classname={classes.content} />
      </main>
      <LoadMore />
    </div>
  );
};

export default Content;

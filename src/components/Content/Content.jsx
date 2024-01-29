import Filter from '../Filter/Filter';
import Main from '../Mainlotslist/Mainlotslist';
import classes from './Content.module.scss';
import LoadMore from '../Loadmore/LoadMore';

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

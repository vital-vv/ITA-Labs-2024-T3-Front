import Filter from '../Filter/Filter';
import MainLotsList from '../MainLotsList/MainLotsList';
import classes from './Content.module.scss';
import LoadMore from '../LoadMore/LoadMore';

const Content = () => {
  return (
    <div>
      <main>
        <Filter classname={classes.filter} />
        <MainLotsList classname={classes.content} />
      </main>
      <LoadMore />
    </div>
  );
};

export default Content;

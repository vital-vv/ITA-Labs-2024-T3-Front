import Filter from '../Filter/Filter';
import MainLotsList from '../MainLotsList/MainLotsList';
import classes from './Content.module.scss';

const Content = () => {
  return (
    <main>
      <Filter classname={classes.filter} />
      <MainLotsList classname={classes.content} />
    </main>
  );
};

export default Content;

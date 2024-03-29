import Filter from '../Filter/Filter';
import MainLotsList from '../MainLotsList/MainLotsList';
import ChoseOptions from '../ChoseOptions/ChoseOptions';
import classes from './Content.module.scss'

const Content = () => {
  return (
    <main>
      <Filter />
      <div className={classes.notfilter}>
        <ChoseOptions />
        <MainLotsList />
      </div>
    </main>
  );
};

export default Content;

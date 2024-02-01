import '../assets/styles/nullStyles.module.css';
import { AppRoutes } from './Routes/AppRoutes.jsx';
import { Header } from './Header/Header.jsx';
import LotsList from './LotsList/LotsList.jsx';
import Footer from './Footer/Footer';
import LotView from './LotView/LotView.jsx';
import classes from '../assets/styles/nullStyles.module.css';

function App() {
  return (
    <div>
      <div className={classes.main}>
      <Header />
        {/* <LotView /> */}
        {/* <AppRoutes /> */}
        {/* <LotsList />  */}
      </div>
      <Footer />
    </div>
  );
}

export default App;

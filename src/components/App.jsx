import '../assets/styles/nullStyles.module.css';
import { AppRoutes } from './Routes/AppRoutes.jsx';
import { Header } from './Header/Header.jsx';
import Footer from './Footer/Footer';
import classes from '../assets/styles/nullStyles.module.css';

function App() {
  return (
    <div>
      <div className={classes.main}>
        <Header />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;

import '../assets/styles/nullStyles.module.css';
import styles from './App.module.scss';
import { AppRoutes } from './Routes/AppRoutes.jsx';
import { Header } from './Header/Header.jsx';
// import LotsList from './LotsList/LotsList';
// import Footer from './Footer/Footer';

function App() {
  return (
    <div className={styles.routes}>
      <Header />
      <AppRoutes />
      {/* <LotsList />  */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;

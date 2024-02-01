import '../assets/styles/nullStyles.module.css';
import { AppRoutes } from './Routes/AppRoutes.jsx';
import { Header } from './Header/Header.jsx';
import LotsList from './LotsList/LotsList';
import Footer from './Footer/Footer';
import LotView from './LotView/LotView.jsx'

function App() {
  return (
    <div>
      <Header />
      <LotView />
      {/* <AppRoutes /> */}
      {/* <LotsList />  */}
      <Footer />
    </div>
  );
}

export default App;

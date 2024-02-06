import '../assets/styles/nullStyles.module.css';
import { AppRoutes } from './Routes/AppRoutes.jsx';
import { Header } from './Header/Header.jsx';
import Footer from './Footer/Footer';

function App() {
  return (
    <div>
      <Header />
      <AppRoutes />
       <Footer />
    </div>
  );
}

export default App;

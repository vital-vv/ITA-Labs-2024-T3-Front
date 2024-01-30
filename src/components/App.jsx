import '../assets/styles/nullStyles.module.css'
import styles from './App.module.scss'
import {AppRoutes} from './Routes/AppRoutes.jsx';
import {Header} from './Header/Header.jsx';

function App() {

    return (
        <div className={styles.routes}>
            <Header/>
            <AppRoutes/>
        </div>
    )
}

export default App

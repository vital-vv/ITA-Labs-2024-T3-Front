import '../assets/styles/nullStyles.module.css'
import styles from './App.module.scss'
import {AppRoutes} from './Routes/AppRoutes.jsx';
import {Header} from './Header/Header.jsx';
import {SideBar} from './SideBar/SideBar.jsx';
import {Categories} from './Categories/Categories.jsx';

function App() {

    return (
        <div className={styles.routes}>
            <Header/>
            <Categories/>
            <SideBar/>
            <AppRoutes/>
        </div>
    )
}

export default App

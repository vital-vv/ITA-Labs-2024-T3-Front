import '../assets/styles/nullStyles.module.css'
import styles from './App.module.scss'
import {Routes, Route} from 'react-router-dom';
import {Layout} from './Layout.jsx';
import {Homepage} from '../views/Homepage.jsx';
import {Fruits} from '../views/Fruits.jsx';
import {Notfoudpage} from '../views/Notfoudpage.jsx';

function App() {

    return (
        <div className={styles.routes}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path="fruits" element={<Fruits/>}/>
                    <Route path="*" element={<Notfoudpage/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App

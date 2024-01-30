import {Routes,Route} from 'react-router-dom';
import {Homepage} from '../../views/Homepage/Homepage.jsx';

function AppRoutes() {

    return (
        <Routes>
            <Route index element={<Homepage/>}/>
        </Routes>
    )
}

export {AppRoutes}

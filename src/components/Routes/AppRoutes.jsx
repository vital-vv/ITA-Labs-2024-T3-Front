import {Routes,Route} from 'react-router-dom';
import {HomePage} from '../../views/HomePage/HomePage.jsx';

function AppRoutes() {

    return (
        <Routes>
            <Route index element={<HomePage/>}/>
        </Routes>
    )
}

export {AppRoutes}

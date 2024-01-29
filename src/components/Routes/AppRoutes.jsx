import {Routes,Route} from 'react-router-dom';
import {Homepage} from '../../views/Homepage.jsx';
// import {Layout} from "../Layout.jsx";
function AppRoutes() {

    return (
        <Routes>
            {/*<Route index element={<Layout/>}/>*/}

            <Route index element={<Homepage/>}/>
        </Routes>
    )
}

export {AppRoutes}

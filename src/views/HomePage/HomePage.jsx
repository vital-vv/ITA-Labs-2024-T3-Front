import {Categories} from '../../components/Categories/Categories.jsx';
import {Outlet} from "react-router-dom";

function HomePage() {

    return (
        <>
            <Categories/>
            <Outlet/>
        </>
    )
}

export {HomePage}

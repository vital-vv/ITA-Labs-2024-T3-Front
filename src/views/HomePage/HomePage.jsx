import {Categories} from '../../components/Categories/Categories.jsx';
import {Outlet} from "react-router-dom";
import {Header} from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function HomePage() {

    return (
        <>
            <Header/>
            <Categories/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export {HomePage}

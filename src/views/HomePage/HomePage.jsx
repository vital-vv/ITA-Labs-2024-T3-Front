import {Categories} from '../../components/Categories/Categories.jsx';
import {Outlet} from "react-router-dom";
import {Header} from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import classes from './HomePage.module.scss'

function HomePage() {

    return (
        <>
            <Header/>
            <div className={classes.mainContent}>
            <Categories/>
            <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export {HomePage}

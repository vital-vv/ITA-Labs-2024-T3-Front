import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";

function StateAdd() {
    return ( 
        <>
            <Header/>
            <Outlet/>   
        </>
     );
}

export default StateAdd;
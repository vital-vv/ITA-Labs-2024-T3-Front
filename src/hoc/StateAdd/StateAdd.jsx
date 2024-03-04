import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useSelector } from "react-redux";

function StateAdd() {
    const status = useSelector(state => state.lots.fullValidationForm);

    if (!status) {
        return <Navigate to={'/addlot'} />
    }

    return ( 
        <>
            <Header/>
            <Outlet/>   
        </>
     );
}

export default StateAdd;
import {useDispatch, useSelector} from "react-redux";
import {loadUserAllBets, selectUserData} from "../../features/currentUser/currentUserSlice.js";
import {useEffect} from "react";
import MainLotsList from "../Mainlotslist/Mainlotslist.jsx";

function BetsContent() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);

    useEffect (() => {
        switch (user.userData.role) {
            case "USER":
                dispatch(loadUserAllBets({ status : 'OVERBID'}));
                break;
            case "EMPLOYEE":
                //dispatch for lots
                break;
        }
    },[dispatch])

    return (
        <>
          <MainLotsList/>
        </>
    )
}

export {BetsContent}

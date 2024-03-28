import {useDispatch, useSelector} from "react-redux";
import {loadUserAllBets, selectUserData} from "../../features/currentUser/currentUserSlice.js";
import {useEffect} from "react";
import MainLotsList from "../Mainlotslist/Mainlotslist.jsx";
import {getAllLots} from "../../features/filter/filterSlice.js";

function BetsContent() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);

    useEffect (() => {
        switch (user.userData.role) {
            case "USER":
                dispatch(loadUserAllBets({ status : 'OVERBID'}));
                break;
            case "EMPLOYEE":
                if(user.currentTab === 'Active'){
                    dispatch(getAllLots({ lotStatus : 'ACTIVE'}));
                } else if (user.currentTab === 'Moderating'){
                    dispatch(getAllLots({ lotStatus : 'MODERATED'}));
                }
                break;
        }
    },[dispatch, user.currentTab])

    return (
          <MainLotsList/>
    )
}

export {BetsContent}

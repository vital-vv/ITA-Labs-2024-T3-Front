import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../features/currentUser/currentUserSlice.js";
import {useEffect} from "react";
import MainLotsList from "../Mainlotslist/Mainlotslist.jsx";
import {
    getAllLots,
    loadUserAllBets,
    getUserLots,
    getUserOrders,
    getAllOrders, getUserSoldLots
} from "../../features/filter/filterSlice.js";
import {useLocation} from "react-router-dom";

function BetsContent() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);
    const location = useLocation().pathname;

    useEffect(() => {
        switch (user.userData.role) {
            case "USER":
                if (user.currentTab === 'Active' && location === '/user/advertisements') {
                    dispatch(getUserLots({status: 'ACTIVE'}));
                } else if (user.currentTab === 'Pending') {
                    dispatch(getUserLots({status: 'MODERATED, CANCELLED'}));
                } else if (user.currentTab === 'Inactive') {
                    dispatch(getUserLots({status: 'DEACTIVATED'}));
                } else if (user.currentTab === 'Active' && location === '/user/bets') {
                    dispatch(loadUserAllBets({status: 'LEADING'}));
                } else if (user.currentTab === 'Outbid') {
                    dispatch(loadUserAllBets({status: 'OVERBID'}));
                } else if (user.currentTab === 'Active' && location === '/user/orders') {
                    dispatch(getUserOrders({status: 'ACTIVE'}));
                }else if (user.currentTab === 'Delivered') {
                    dispatch(getUserOrders({status: 'SOLD'}));
                } else if (user.currentTab === 'Completed') {
                    dispatch(getUserSoldLots());
                }
                break;
            case "EMPLOYEE":
                if (user.currentTab === 'Active') {
                    dispatch(getAllLots({lotStatus: 'ACTIVE'}));
                } else if (user.currentTab === 'Moderating lots') {
                    dispatch(getAllLots({lotStatus: 'MODERATED'}));
                }else if (user.currentTab === 'Moderating orders') {
                    dispatch(getAllOrders());
                }
                break;
        }
    }, [dispatch, user.currentTab, location,user.userData.role])

    return (
        <MainLotsList/>
    )
}

export {BetsContent}
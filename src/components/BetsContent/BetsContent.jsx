import {
    getAllLots,
    getAllOrders,
    getUserLots,
    getUserOrders, getUserSoldLots,
    loadUserAllBets
} from "../../features/filter/filterSlice.js";
import MainLotsList from "../Mainlotslist/Mainlotslist.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../features/currentUser/currentUserSlice.js";
import {useLocation} from "react-router-dom";

function BetsContent() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);
    const location = useLocation().pathname;

    useEffect(() => {
        const handleUserActions = (user, dispatch) => {
            const actions = {
                'Active': () => {
                    if (location === '/user/advertisements') {
                        dispatch(getUserLots({status: 'ACTIVE'}));
                    } else if (location === '/user/bets') {
                        dispatch(loadUserAllBets({status: 'LEADING'}));
                    } else if (location === '/user/orders') {
                        dispatch(getUserOrders({status: 'ACTIVE'}));
                    }
                },
                'Pending': () => dispatch(getUserLots({status: 'MODERATED, CANCELLED'})),
                'Inactive': () => dispatch(getUserLots({status: 'DEACTIVATED, AUCTION_ENDED, EXPIRED'})),
                'Sold': () => dispatch(getUserLots({status: 'SOLD'})),
                'Outbid': () => dispatch(loadUserAllBets({status: 'OVERBID'})),
                'Delivered': () => dispatch(getUserOrders({status: 'SOLD'})),
                'Completed': () => dispatch(getUserSoldLots())
            };

            actions[user.currentTab]?.();
        };
        const handleEmployeeActions = (user, dispatch) => {
            const actions = {
                'Active': () => dispatch(getAllLots({lotStatus: 'ACTIVE'})),
                'Moderating lots': () => dispatch(getAllLots({lotStatus: 'MODERATED'})),
                'Moderating orders': () => dispatch(getAllOrders()),
            };

            actions[user.currentTab]?.();
        };

        switch (user.userData.role) {
            case "USER":
                handleUserActions(user, dispatch);
                break;
            case "EMPLOYEE":
                handleEmployeeActions(user, dispatch);
                break;
        }


    }, [dispatch, user.currentTab, location, user.userData.role])

    return (
        <MainLotsList/>
    )
}

export {BetsContent};
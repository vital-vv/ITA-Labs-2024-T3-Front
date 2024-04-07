import {
    getAllLots,
    getAllOrders,
    getUserLots,
    getUserOrders, getUserSoldLots,
    loadUserAllBets,
    getCurrencyThisSession
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
    const {currencyThisSession} = useSelector(state => state.currentUser)

    useEffect(() => {
        const handleUserActions = (user, dispatch) => {
            const actions = {
                'Active': () => {
                    if (location === '/user/advertisements') {
                        dispatch(getUserLots({status: 'ACTIVE', currency: currencyThisSession}));
                    } else if (location === '/user/bets') {
                        dispatch(loadUserAllBets({status: 'LEADING', currency: currencyThisSession}));
                    } else if (location === '/user/orders') {
                        dispatch(getUserOrders({status: 'ACTIVE', currency: currencyThisSession}));
                    }
                },
                'Pending': () => dispatch(getUserLots({status: 'MODERATED, CANCELLED', currency: currencyThisSession})),
                'Inactive': () => dispatch(getUserLots({status: 'DEACTIVATED, AUCTION_ENDED, EXPIRED', currency: currencyThisSession})),
                'Sold': () => dispatch(getUserLots({status: 'SOLD', currency: currencyThisSession})),
                'Outbid': () => dispatch(loadUserAllBets({status: 'OVERBID', currency: currencyThisSession})),
                'Delivered': () => dispatch(getUserOrders({status: 'SOLD', currency: currencyThisSession})),
                'Completed': () => dispatch(getUserSoldLots())
            };

            actions[user.currentTab]?.();
        };
        const handleEmployeeActions = (user, dispatch) => {
            const actions = {
                'Active': () => dispatch(getAllLots({lotStatus: 'ACTIVE', currency: currencyThisSession })),
                'Moderating lots': () => dispatch(getAllLots({lotStatus: 'MODERATED', currency: currencyThisSession})),
                'Moderating orders': () => dispatch(getAllOrders()),
            };

            actions[user.currentTab]?.();
        };

        const handleAdminActions = (user, dispatch) => {
            const actions = {
                'Active': () => dispatch(getAllLots({lotStatus: 'ACTIVE', currency: currencyThisSession })),
                'Sold': () => dispatch(getAllLots({lotStatus: 'SOLD', currency: currencyThisSession})),
                'Auction Ended': () => dispatch(getAllLots({lotStatus: 'AUCTION_ENDED', currency: currencyThisSession})),
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
            case "ADMIN":
                handleAdminActions(user, dispatch);
                break;
        }


    }, [dispatch, user.currentTab, location, user.userData.role, currencyThisSession])

    return (
        <MainLotsList/>
    )
}

export {BetsContent};
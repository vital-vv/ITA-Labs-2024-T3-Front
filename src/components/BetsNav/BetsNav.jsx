import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useEffect, useState} from 'react';
import styles from './BetsNav.module.scss';
import {ToggleBtn} from "./ToggleBtn/ToggleBtn.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData, setActiveTab} from "../../features/currentUser/currentUserSlice.js";

function determineTabsName(betType, userRole) {
    const tabsMap = {
        advertisements: {
            USER: ['Active', 'Pending', 'Inactive', 'Sold'],
            EMPLOYEE: ['Active', 'Moderating lots', 'Moderating orders'],
        },
        orders: {
            USER: ['Active', 'Delivered', 'Completed'],
        },
        bets: {
            USER: ['Active', 'Outbid'],
            ADMIN: ['Active', 'Sold', 'Auction Ended']
        },
    };
    return tabsMap[betType] && tabsMap[betType][userRole] ? tabsMap[betType][userRole] : [];
}

function BetsNav() {
    const  {betType} = useParams();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const { role: userRole } = userData.userData;
    const [tabsName, setTabsName] = useState([]);

    // const navigate = useNavigate();
    const currentTab = userData.currentTab;
    console.log(window.location.pathname)

    useEffect(() => {

        if (betType && userRole) {
            const newTabsName = determineTabsName(betType, userRole);
            setTabsName(newTabsName);
            if (newTabsName[0]) {
                dispatch(setActiveTab(newTabsName[0]));
            }
        } else if(window.location.pathname === '/team3/admin/bets'){
            const newTabsName = determineTabsName("bets", userRole);
            setTabsName(newTabsName);
            if (newTabsName[0]) {
                dispatch(setActiveTab(newTabsName[0]));
            }
        }
    }, [betType, userRole, dispatch]);

    const handleChange = (event, newAlignment) => {
        dispatch(setActiveTab(newAlignment));
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={currentTab}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            className={styles.buttonGroup}
        >
            <ToggleBtn tabsName={tabsName} />
        </ToggleButtonGroup>
    );
}

export {BetsNav};
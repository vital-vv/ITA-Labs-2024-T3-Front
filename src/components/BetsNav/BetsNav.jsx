import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useEffect} from 'react';
import styles from './BetsNav.module.scss';
import {ToggleBtn} from "./ToggleBtn/ToggleBtn.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData, setActiveTab} from "../../features/currentUser/currentUserSlice.js";

function determineTabsName(betType, userRole) {
    const tabsMap = {
        advertisements: {
            USER: ['Active', 'Pending', 'Inactive'],
            EMPLOYEE: ['Active','Moderating'],
        },
        orders: {
            USER: ['Active', 'Completed'],
        },
        bets: {
            USER: ['Active', 'Outbid'],
        }
    };
    return tabsMap[betType][userRole];
}

function BetsNav() {

    const { betType } = useParams();
    const dispatch = useDispatch();
    let userRole = useSelector(selectUserData).userData.role;
    const tabsName = determineTabsName(betType, userRole);
    const navigate = useNavigate();

    const handleChange = (event, newAlignment) => {
        dispatch(setActiveTab(newAlignment));
    };

    let currentTab = useSelector(selectUserData).currentTab;
    useEffect(() => {
        dispatch(setActiveTab('Active'));
    }, [dispatch, navigate]);

    return (
        <ToggleButtonGroup
            color="primary"
            value={currentTab}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            className={styles.buttonGroup}
        >
            <ToggleBtn tabsName={tabsName}/>
        </ToggleButtonGroup>
    );
}

export {BetsNav}

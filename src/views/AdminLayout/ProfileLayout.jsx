import styles from './ProfileLayout.module.scss';
import {Outlet} from 'react-router-dom';
import {Header} from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import {withAuthenticator} from '@aws-amplify/ui-react';
import {adminNav} from "../../utils/constants.js";
import {userNav} from "../../utils/constants.js";
import {exchangerNav} from "../../utils/constants.js";
import {useSelector} from "react-redux";
import {selectUserData} from "../../features/currentUser/currentUserSlice.js";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";


function ProfileLayout() {
    const user = useSelector(selectUserData);
    const [navOptions, setNavOptions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.userData) {
            let options = user.userData.role === 'USER' ? userNav :
                user.userData.role === 'ADMIN' ? adminNav :
                    user.userData.role === 'EMPLOYEE' ? exchangerNav : null;
            setNavOptions(options);
            setLoading(false);
        }
    }, [user.userData]);

    return (
        <>
            <Header/>
            <div className={styles.adminPanel}>
                {loading ? <CircularProgress color="success" className={styles.progress}/> : (
                    <>
                        {navOptions && <Navigation navTabs={navOptions}/>}
                        <Outlet/>
                    </>
                )}
            </div>
            <Footer/>
        </>
    )
}

const ProfileLayoutWithAuth = withAuthenticator(ProfileLayout);
export {ProfileLayoutWithAuth as ProfileLayout};

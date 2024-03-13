import styles from './ProfileLayout.module.scss';
import {Outlet, useNavigate} from 'react-router-dom';
import {Header} from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import {withAuthenticator} from '@aws-amplify/ui-react';
import {adminNav} from "../../utils/constants.js";
import {userNav} from "../../utils/constants.js";
import {exchangerNav} from "../../utils/constants.js";
import {useSelector} from "react-redux";
import {selectUserData} from "../../features/currentUser/currentUserSlice.js";


function ProfileLayout() {
    const user = useSelector(selectUserData);
    const navigate = useNavigate();

    let navOptions = user.userData.role === 'user' ? userNav :
        user.userData.role === 'admin' ? adminNav :
            user.userData.role === 'exchanger' ? exchangerNav : null;

    if (navOptions === null) {
        navigate('/login');
    }

    return (
        <>
            <Header/>
            <div className={styles.adminPanel}>
                {navOptions && <Navigation navTabs={navOptions}/>}
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

const ProfileLayoutWithAuth = withAuthenticator(ProfileLayout);
export {ProfileLayoutWithAuth as ProfileLayout};

import styles from './RightBar.module.scss';
import langIcon from '../../../assets/images/langIcon.png';
import usdIcon from '../../../assets/images/usdIcon.png';
import {useSelector} from "react-redux";
import {selectUserData} from "../../../features/currentUser/currentUserSlice.js";
import {IsAuthorized} from "./IsAuthorized/IsAuthorized.jsx";
import {signOut} from "@aws-amplify/auth";

function RightBar() {

    const user = useSelector(selectUserData);
    const rightBarStyle = {
        width: user.userData?.role === 'user' ? '550px' : '300px'
    };

    return (
        <div className={styles.rightBar} style={rightBarStyle}>
            <div>
                <p>USD</p>
                <img alt={usdIcon} src={usdIcon}/>
            </div>
            <div onClick={logOutt}>
                <p>ENG</p>
                <img alt={langIcon} src={langIcon}/>
            </div>
           <IsAuthorized/>
</div>
)}

function logOutt () {
    signOut();
}

export {RightBar};

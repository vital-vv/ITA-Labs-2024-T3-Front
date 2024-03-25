import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import styles from './BasicMenu.module.scss';
import menuIcon from '../../../assets/images/menuIcon.png';
import {ROUTES} from '../../../utils/routes.js';

import {NavLink, useNavigate} from 'react-router-dom';
import { useState} from 'react';
import {signOut} from "@aws-amplify/auth";
import {useDispatch, useSelector} from "react-redux";
import {clearUserData, selectUserData} from "../../../features/currentUser/currentUserSlice.js";
import {cognitoSession} from "../../../utils/auth.js";

export default function BasicMenu() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUserData);
    let route = '';

    switch (user.userData?.role) {
        case 'ADMIN':
            route = ROUTES.ADMINACCOUNT;
            break;
        default:
            route = ROUTES.ACCOUNT;
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const  signOutApp = async() => {
        try{
            await signOut();
            dispatch(clearUserData());
            await cognitoSession();
            handleClose();
            navigate('/');
        } catch (err){
            console.log(err);
        }
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
               <img className={styles.img} src={menuIcon} alt={menuIcon}/>
            </Button>
            <Menu
                className={styles.menu}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <NavLink to={ROUTES.ACCOUNT} onClick={handleClose}>Profile</NavLink>
                <NavLink to={ROUTES.HOME} onClick={signOutApp}>Logout</NavLink>
            </Menu>
        </div>
    );
}
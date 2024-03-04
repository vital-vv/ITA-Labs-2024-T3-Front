import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import styles from './BasicMenu.module.scss';
import menuIcon from '../../../assets/images/menuIcon.png';
import {ROUTES} from '../../../utils/routes.js';

import {NavLink, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {signOut} from "@aws-amplify/auth";
import {useDispatch, useSelector} from "react-redux";
import {clearUserData, selectUserData} from "../../../features/currentUser/currentUserSlice.js";

export default function BasicMenu() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function  signOutApp(){
        signOut();
        handleClose();
        navigate('/');
        dispatch(clearUserData());
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
                <NavLink to={ROUTES.HOME} onClick={handleClose}>Profile</NavLink>
                <NavLink to={ROUTES.HOME} onClick={handleClose}>My account</NavLink>
                <NavLink to={ROUTES.ONBOARDING} onClick={handleClose}>To onboarding</NavLink>
                <NavLink to={ROUTES.HOME} onClick={signOutApp}>Logout</NavLink>
                <NavLink to={ROUTES.LOGIN} onClick={handleClose}>LogIn</NavLink>
            </Menu>
        </div>
    );
}
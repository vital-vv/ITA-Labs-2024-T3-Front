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
import advertisements from '../../../assets/images/advertisements.png'
import bet from '../../../assets/images/bet.png'
import orders from '../../../assets/images/orders.png'
import account from '../../../assets/images/account.png'
import logout from '../../../assets/images/logout.png'

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

    const {first_name, last_name, role} = useSelector(state => state.currentUser.userData);
    const isUser = role === "USER"

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
                <NavLink to={ROUTES.ACCOUNT}>{`${first_name} ${last_name}` || 'Guest'}</NavLink>
                <hr />
                <NavLink to={ROUTES.ADVERTISEMENT} onClick={handleClose}><img src={advertisements} alt='advertisements' />My advertisments</NavLink>
                <NavLink to={ROUTES.BETS} onClick={handleClose} className={isUser ? null : styles.notDisplay}><img src={bet} alt='betting' />Betting</NavLink>
                <NavLink to={ROUTES.ORDERS} onClick={handleClose} className={isUser ? null : styles.notDisplay}><img src={orders} alt='orders' />My orders</NavLink>
                <NavLink to={ROUTES.ACCOUNT} onClick={handleClose}><img src={account} alt='account' />My account</NavLink>
                <hr />
                <NavLink to={ROUTES.ACCOUNT} onClick={signOutApp}><img src={logout} alt='logout' />Log out</NavLink>
            </Menu>
        </div>
    );
}
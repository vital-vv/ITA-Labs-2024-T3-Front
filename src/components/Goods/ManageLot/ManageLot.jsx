import classes from "../Goods.module.scss";
import styles from './ManageLot.module.scss';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined.js";
import {useState} from "react";
import Menu from "@mui/material/Menu";
import editIcon from '../../../assets/images/editIcon.png';
import deactivateIcon from '../../../assets/images/deactivate.png';
import {useDispatch} from "react-redux";
import {deactivateLot} from "../../../features/filter/filterSlice.js";

function ManageLot({lotId, lotStatus}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        e.preventDefault();
        setAnchorEl(null);
    };

    function deactivateLotItem (e){
        e.preventDefault();
        dispatch(deactivateLot(lotId));
        e.preventDefault();
    }

    return (
        <>
            {lotStatus === 'moderated' ? <div className={styles.moderated}>{lotStatus}</div> : <div className={styles.rejected}>rejected</div>}
            <div className={classes.manage} onClick={handleClick}>
                <SettingsOutlinedIcon fontSize="small"/><p>manage</p>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className={styles.menu}
            >
                <div className={styles.menuItem}><img src={editIcon} alt={editIcon}/>Edit</div>
                <div onClick={deactivateLotItem} className={styles.menuItem}><img src={deactivateIcon} alt={deactivateIcon}/><p>Deactivate</p></div>
            </Menu>
        </>
    )
}

export {ManageLot}
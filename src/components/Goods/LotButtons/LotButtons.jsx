import Hammer from '../../../assets/svg/Hammer.jsx';
import Cart from '../../../assets/svg/Cart.jsx';
import Trash from '../../../assets/svg/Trash.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {buyLot, confirmLot} from '../../../features/filter/filterSlice.js';
import {useState} from 'react';
import {selectUserData} from '../../../features/currentUser/currentUserSlice.js';
import {ModalWindow} from '../ModalWindow/ModalWindow.jsx';
import {changeModalThrough} from '../../../features/lots/lotsSlice.js';
import {useLocation} from "react-router-dom";
import styles from './LotButtons.module.scss';
import warning from '../../../assets/images/warning.png';
import {ApproveRejectBtns} from "./ApproveRejectBtns/ApproveRejectBtns.jsx";

const LotButtons = ({userRole, id, buttonDelete, title, lotItem}) => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const dispatch = useDispatch();
    const [openBid, setOpenBid] = useState(false);
    const currentTab = useSelector(selectUserData).currentTab;
    const location = useLocation().pathname;
    const user = useSelector(selectUserData);
    const toggleModalBids = (event) => {
        setOpenBid((prevOpen) => !prevOpen);
        if (lotItem.leading) {
            setMinValue(lotItem.leading.amount + 1);
        } else {
            setMinValue(lotItem.start_price);
        }
        setMaxValue(lotItem.total_price - 1);
        dispatch(changeModalThrough(event.currentTarget.id));
    };

    function confirmLotItem() {
        dispatch(confirmLot(id));
    }

    function buyLotForTotalPrice() {
        dispatch(buyLot(id));
    }

    const handleUserActions = (user) => {
        const actions = {
            'Inactive': () => null,
            'Pending': () => {
                if (lotItem.status === 'cancelled') {
                    return (
                        <div className={styles.description}><img src={warning} alt={warning}/>{lotItem?.reject_message}
                        </div>
                    )
                } else return null;
            },
            'Active': () => {
                if (location === '/user/advertisements' && lotItem.leading !== null) {
                    return (
                        <button onClick={confirmLotItem} className={styles.confirmBtn}>✓ Confirm for
                            ${lotItem?.leading?.amount} </button>
                    )
                } else if (location === '/user/advertisements' && user?.userData?.user_id === lotItem.created_by) {
                    return null;
                }
            },
            default: handleDefaultActions(),
        };

        actions[user.currentTab]?.() || actions.default?.();
    };

    const handleEmployeeActions = (user) => {
        const actions = {
            'Moderating lots' : () => {
                console.log('mode')
                return <ApproveRejectBtns id={id} title={lotItem.title}/>
            },
            'Moderating orders': () => {
               return <ApproveRejectBtns id={id} title={lotItem.title}/>
            },
        };

        actions[user.currentTab]?.();
    };

    const handleDefaultActions = () => {
        return (
            <>
                <button onClick={toggleModalBids} id={id}>
                    <Hammer/>
                    {currentTab === 'Active' ? <p>New bet</p> : <p>My bet</p>}
                </button>
                <button onClick={buyLotForTotalPrice}>
                    <Cart/>
                    Buy now
                </button>
                {currentTab !== 'Active' ? <button onClick={buttonDelete} id={id}>
                    <Trash/>
                </button> : null}
                <ModalWindow
                    open={openBid}
                    handleClose={toggleModalBids}
                    minValue={minValue}
                    maxValue={maxValue}
                />
            </>
        )
    };

    switch (userRole) {
        case "USER":
            handleUserActions(user);
            break;
        case "EMPLOYEE":
            handleEmployeeActions(user);
            break;
        default:
            handleDefaultActions();
            break;
    }
};

export {LotButtons};
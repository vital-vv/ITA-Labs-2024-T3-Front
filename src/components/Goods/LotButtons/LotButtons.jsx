import Hammer from "../../../assets/svg/Hammer.jsx";
import Cart from "../../../assets/svg/Cart.jsx";
import Trash from "../../../assets/svg/Trash.jsx";
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import {useDispatch, useSelector} from "react-redux";
import {approveLot} from "../../../features/filter/filterSlice.js";
import {ModalForReject} from "./ModalForReject/ModalForReject.jsx";
import {useState} from "react";
import {selectUserData} from "../../../features/currentUser/currentUserSlice.js";

const LotButtons = ({userRole, id, buttonDelete, title}) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const currentTab = useSelector(selectUserData).currentTab;
    const toggleModal = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleApprove = (e) => {
        dispatch(approveLot(e.target.id));
    };

    switch (userRole) {
        case "USER":
            return (
                <>
                    <button onClick={toggleModal} id={id}>
                        <Hammer/>
                        My bet
                    </button>
                    <button>
                        <Cart/>
                        Buy now
                    </button>
                    <button onClick={buttonDelete} id={id}>
                        <Trash/>
                    </button>
                </>
            );
        case "EMPLOYEE":
            if (currentTab === "Moderating") {
                return (
                    <>
                        <button onClick={handleApprove} id={id}>
                            <DoneIcon/>
                            Approve
                        </button>
                        <button onClick={toggleModal} id={id}>
                            <DoDisturbIcon/>
                            Reject
                        </button>
                        <ModalForReject open={open} handleClose={toggleModal} id={id} title={title}/>
                    </>
                );
            } else {
                return null;
            }
    }
};

export {LotButtons};
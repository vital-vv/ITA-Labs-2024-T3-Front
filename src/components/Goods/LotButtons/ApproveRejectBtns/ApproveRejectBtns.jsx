import DoneIcon from "@mui/icons-material/Done.js";
import DoDisturbIcon from "@mui/icons-material/DoDisturb.js";
import {ModalForReject} from "../ModalForReject/ModalForReject.jsx";
import {approveLot} from "../../../../features/filter/filterSlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";

const ApproveRejectBtns = ({id, title}) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleApprove = () => {
        dispatch(approveLot(id));
    };

    const toggleModal = () => {
        setOpen((prevOpen) => !prevOpen);
    };

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
            <ModalForReject
                open={open}
                handleClose={toggleModal}
                id={id}
                title={title}
            />
        </>
    );
};

export {ApproveRejectBtns};

import {Modal, Snackbar, TextField} from "@mui/material";
import {Box} from "@mui/system";
import styles from './ModalForRejecr.module.scss';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {rejectLot} from "../../../../features/filter/filterSlice.js";

const ModalForReject = ({handleClose, open, id, title}) => {

    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const handleOpenSnackBar = () => {
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    function handleRejectLot() {
        if (description.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        dispatch(rejectLot({id, description}));
        handleOpenSnackBar();
        handleClose();
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modalContainer}>
                    <div className={styles.rejectTitle}>Lot <span className={styles.rejectSpan}>{title}</span> will be
                        rejected because...
                    </div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        error={error}
                        required={true}
                        value={description}
                        helperText={error ? "Description cannot be empty" : ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className={styles.rejectBtn} onClick={handleRejectLot} id={id}>Reject lot</button>
                </Box>
            </Modal>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={5000}
                onClose={handleCloseSnackBar}
                message="This Snackbar will be dismissed in 5 seconds."
            />
        </>
    );
};

export {ModalForReject};

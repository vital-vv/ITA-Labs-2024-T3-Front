import {Modal, Box} from '@mui/material';

import styles from './ModalWindow.module.scss';
import exitIcon from '../../../assets/images/exitIcon.png';
import {ModalForm} from './Form/Form.jsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 412,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalWindow({handleClose, open, maxValue, minValue, id}) {
    return (
        <div onClick={event => event.preventDefault()}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.modalTitle}>
                        <p>Place a bet</p>
                        <button onClick={handleClose}><img src={exitIcon} alt={exitIcon}/></button>
                    </div>
                    <ModalForm minValue={minValue} maxValue={maxValue} id={id}/>
                </Box>
            </Modal>
        </div>
    );
}

export {ModalWindow};

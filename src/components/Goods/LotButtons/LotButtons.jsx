import Hammer from '../../../assets/svg/Hammer.jsx';
import Cart from '../../../assets/svg/Cart.jsx';
import Trash from '../../../assets/svg/Trash.jsx';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useDispatch, useSelector } from 'react-redux';
import { approveLot } from '../../../features/filter/filterSlice.js';
import { ModalForReject } from './ModalForReject/ModalForReject.jsx';
import { useState } from 'react';
import { selectUserData } from '../../../features/currentUser/currentUserSlice.js';
import { ModalWindow } from '../ModalWindow/ModalWindow.jsx';
import { changeModalThrough } from '../../../features/lots/lotsSlice.js';

const LotButtons = ({ userRole, id, buttonDelete, title, lotItem }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const dispatch = useDispatch();
  const [openBid, setOpenBid] = useState(false);
  const [open, setOpen] = useState(false);
  const currentTab = useSelector(selectUserData).currentTab;

  const toggleModalBids = (event) => {
    setOpenBid((prevOpen) => !prevOpen);
    if (lotItem.leading) {
      setMinValue(lotItem.leading.amount + 1);
    } else {
      setMinValue(lotItem.start_price);
    }
    setMaxValue(lotItem.total_price - 1);
    dispatch(changeModalThrough(event.target.id));
  };

  const toggleModal = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleApprove = (e) => {
    dispatch(approveLot(e.target.id));
  };

  switch (userRole) {
    case 'USER':
      return (
        <>
          <button onClick={toggleModalBids} id={id}>
            <Hammer />
            My bet
          </button>
          <button>
            <Cart />
            Buy now
          </button>
          <button onClick={buttonDelete} id={id}>
            <Trash />
          </button>
          <ModalWindow
            open={openBid}
            handleClose={toggleModalBids}
            minValue={minValue}
            maxValue={maxValue}
          />
        </>
      );
    case 'EMPLOYEE':
      if (currentTab === 'Moderating') {
        return (
          <>
            <button onClick={handleApprove} id={id}>
              <DoneIcon />
              Approve
            </button>
            <button onClick={toggleModal} id={id}>
              <DoDisturbIcon />
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
      } else {
        return null;
      }
  }
};

export { LotButtons };

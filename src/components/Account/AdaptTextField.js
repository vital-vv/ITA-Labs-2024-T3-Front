import {styled} from '@mui/material';
import { TextField } from '@mui/material';

const AdaptTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#38999b',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#38999b',
      },
    },
  });

export default AdaptTextField;
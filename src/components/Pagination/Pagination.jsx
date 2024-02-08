import styles from './Pagination.module.scss'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import PropTypes from 'prop-types';

PaginationControlled.propTypes = {
    setPage: PropTypes.func,
    page: PropTypes.number,
}

function PaginationControlled({setPage,page}) {
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Stack className={styles.pagination} spacing={2}>
            <Pagination count={10} page={page} onChange={handleChange} />
        </Stack>
    );
}

export {PaginationControlled}
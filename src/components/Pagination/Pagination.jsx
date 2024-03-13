import styles from './Pagination.module.scss';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

PaginationControlled.propTypes = {
    setPage: PropTypes.func,
    page: PropTypes.number,
}

function PaginationControlled({setPage,page}) {

    const {list} = useSelector(({users}) => users);

    const paginationData = list.metadata;

    let pagesCount;
    paginationData != null ? pagesCount = Math.ceil(paginationData.total_elements / paginationData.size) : null;

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Stack className={styles.pagination} spacing={2}>
            <Pagination count={pagesCount} page={page} onChange={handleChange} />
        </Stack>
    );
}

export {PaginationControlled}
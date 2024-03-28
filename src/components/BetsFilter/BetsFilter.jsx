import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import styles from './BetsFilter.module.scss';
import {OptionsGroup} from "./OptionsGroup/OptionsGroup.jsx";

function BetsFilter() {

    const filterName = ['New ones first', 'Cheap ones first', 'Less time first'];

    return (
        <Box sx={{ minWidth: 200 }} className={styles.filterBox}>
            <FormControl>
                <NativeSelect
                    defaultValue={filterName[0]}
                    className={styles.select}
                    inputProps={{
                        id: 'uncontrolled-native',
                    }}
                >
                    <OptionsGroup className={styles.optionsGroup} filterName={filterName}/>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}

export {BetsFilter}

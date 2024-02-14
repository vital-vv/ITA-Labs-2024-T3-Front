import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {useState} from 'react';

import styles from './BetsNav.module.scss';
import {ToggleBtn} from "./ToggleBtn/ToggleBtn.jsx";

function BetsNav({alignmentState, tabsName}) {
    const [alignment, setAlignment] = useState(alignmentState);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            className={styles.buttonGroup}
        >
            <ToggleBtn tabsName={tabsName}/>
        </ToggleButtonGroup>
    );
}

export {BetsNav}

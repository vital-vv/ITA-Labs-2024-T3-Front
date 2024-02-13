import {ToggleButton} from "@mui/material";

function ToggleBtn({tabsName}) {

    return (
        <>
            {tabsName.map((toggleBtn) => (
                <ToggleButton key={toggleBtn} value={toggleBtn}>{toggleBtn}</ToggleButton>
            ))}

        </>
    )
}

export {ToggleBtn}

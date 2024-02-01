import Label from '../Label/Label.jsx'
import Content from '../Content/Content.jsx'
import classes from './LotsList.module.scss'
import BredCrumbs from '../BredCrumbs/BredCrumbs.jsx';

function LotsList() {
    return (
    <div className={classes.lotsList}>
        <BredCrumbs/>
        <Label />
        <Content />
    </div>
    );
}

export default LotsList
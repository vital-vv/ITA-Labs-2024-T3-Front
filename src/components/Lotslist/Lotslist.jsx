import Label from '../Label/Label.jsx'
import Content from '../Content/Content.jsx'
import classes from './LotsList.module.scss'

function LotsList() {
    return (
    <div className={classes.lotsList}>
        <Label />
        <hr />
        <Content />
    </div>
    );
}

export default LotsList
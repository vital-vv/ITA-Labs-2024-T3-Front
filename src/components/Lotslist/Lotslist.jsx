import Label from '../Label/Label.jsx'
import Content from '../Content/Content.jsx'
import classes from './Lotslist.module.scss'

function Lotslist() {
    return (
    <div className={classes.lotslist}>
        <Label />
        <hr />
        <Content />
    </div>
    );
}

export default Lotslist
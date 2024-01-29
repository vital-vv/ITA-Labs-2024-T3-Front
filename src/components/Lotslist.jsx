import Label from './Label'
import Content from './Content.jsx'
import classes from '../assets/styles/Lotslist.module.scss'

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
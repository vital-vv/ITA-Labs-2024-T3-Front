import styles from './AllBets.module.scss';
import {BetsNav} from "../BetsNav/BetsNav.jsx";
import {BetsContent} from "../BetsContent/BetsContent.jsx";

function AllBets() {

    return (
        <div className={styles.bettingContainer}>
            <BetsNav alignmentState={'Active'}/>
            {/*<BetsFilter/>*/}
            <BetsContent/>
        </div>
    )
}

export {AllBets}

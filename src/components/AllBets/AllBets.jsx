import styles from './AllBets.module.scss';
import {BetsNav} from "../BetsNav/BetsNav.jsx";
import {BetsFilter} from "../BetsFilter/BetsFilter.jsx";
import Goods from "../Goods/Goods.jsx";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserAllBets } from '../../features/currentUser/currentUserSlice.js';

function AllBets() {

    const tabsName = ['Active', 'Outbid'];
    const filterName = ['New ones first', 'Cheap ones first', 'Less time first'];
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(loadUserAllBets());
    },[dispatch])

    return (
        <div className={styles.bettingContainer}>
            <BetsNav alignmentState={'Active'} tabsName={tabsName}/>
            <BetsFilter filterName={filterName}/>
            {/* <Goods />
            <Goods />
            <Goods /> */}
        </div>
    )
}

export {AllBets}

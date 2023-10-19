import React from 'react';

import styles from './AllDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const AllDrones = () => {
    return (
        <div className={styles.allDrones}>
            <DroneInfo/>
            <DroneInfo/>
            <DroneInfo/>
            <DroneInfo/>
            <DroneInfo/>
        </div>
    );
};

export default AllDrones;
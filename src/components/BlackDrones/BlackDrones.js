import React from 'react';

import styles from './BlackDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const BlackDrones = () => {
    return (
        <div className={styles.blackDrones}>
            <DroneInfo/>
            <DroneInfo/>
        </div>
    );
};

export default BlackDrones;
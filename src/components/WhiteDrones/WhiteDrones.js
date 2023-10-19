import React from 'react';

import styles from './WhiteDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const WhiteDrones = () => {
    return (
        <div className={styles.whiteDrones}>
            <DroneInfo/>
            <DroneInfo/>
            <DroneInfo/>
        </div>
    );
};

export default WhiteDrones;
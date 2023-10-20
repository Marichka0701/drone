import React from 'react';
import {useSelector} from "react-redux";

import styles from './WhiteDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const WhiteDrones = () => {
    const {activeDrones} = useSelector(state => state.dronesHistory);

    console.log(activeDrones)
    return (
        <div className={styles.whiteDrones}>
            {
                activeDrones &&
                activeDrones.map((drone, index) => ( <DroneInfo
                    key={index}
                    drone={drone}
                /> ))
            }
        </div>
    );
};

export default WhiteDrones;
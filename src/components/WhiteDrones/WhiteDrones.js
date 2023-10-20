import React from 'react';
import {useSelector} from "react-redux";

import styles from './WhiteDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const WhiteDrones = () => {
    const {whiteDrones} = useSelector(state => state.dronesHistory);

    console.log(whiteDrones)
    return (
        <div className={styles.whiteDrones}>
            {
                whiteDrones &&
                whiteDrones.map((drone, index) => (
                    <DroneInfo
                        type={'white'}
                        key={index}
                        drone={drone}
                    />))
            }
        </div>
    );
};

export default WhiteDrones;
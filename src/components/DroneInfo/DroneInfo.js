import React, {useEffect} from 'react';

import styles from './DroneInfo.module.scss';
import droneIcon from '../../constants/images/white-drone-info.png';

const DroneInfo = ({drone}) => {
    // const {droneId, startPosition, placementTime} = drone;
    useEffect(() => {

    }, [drone])

    return (
        <div className={styles.droneInfo}>
            <div className={styles.droneInfo_titleContainer}>
                <img src={droneIcon} alt="drone icon"/>
                <div className={styles.droneInfo_titleContainer_title}>
                    <h3>{drone?.droneId}</h3>
                    <p>Mavic JS</p>
                </div>
            </div>

            <div className={styles.droneInfo_info}>
                <div className={styles.droneInfo_info_session}>
                    <p className={styles.subtitle}>Session:</p>
                    <p className={styles.info}>4:59:30</p>
                </div>

                <div className={styles.droneInfo_info_onlineFrom}>
                    <p className={styles.subtitle}>Online from:</p>
                    <p className={styles.info}>{drone?.placementTime}</p>
                </div>

                <div className={styles.droneInfo_info_startedGps}>
                    <p className={styles.subtitle}>Started GPS:</p>
                    <p className={styles.info}>{drone?.startPosition?.longitude}, {drone?.startPosition?.latitude}</p>
                </div>
            </div>
        </div>
    );
};

export default DroneInfo;
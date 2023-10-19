import React from 'react';

import styles from './DroneInfo.module.scss';
import drone from '../../constants/images/white-drone-info.png';

const DroneInfo = () => {
    return (
        <div className={styles.droneInfo}>
            <div className={styles.droneInfo_titleContainer}>
                <img src={drone} alt="drone icon"/>
                <div className={styles.droneInfo_titleContainer_title}>
                    <h3>ID 843345</h3>
                    <p>Unknown</p>
                </div>
            </div>

            <div className={styles.droneInfo_info}>
                <div className={styles.droneInfo_info_session}>
                    <p className={styles.subtitle}>Session:</p>
                    <p className={styles.info}>4:59:30</p>
                </div>

                <div className={styles.droneInfo_info_onlineFrom}>
                    <p className={styles.subtitle}>Online from:</p>
                    <p className={styles.info}>07:39:45 AM</p>
                </div>

                <div className={styles.droneInfo_info_startedGps}>
                    <p className={styles.subtitle}>Started GPS:</p>
                    <p className={styles.info}>74.342324, -123,324242</p>
                </div>
            </div>
        </div>
    );
};

export default DroneInfo;
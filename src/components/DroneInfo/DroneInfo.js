import React, {useEffect, useState} from 'react';

import styles from './DroneInfo.module.scss';
import whiteDroneInfo from '../../constants/images/white-drone-info.png';
import blackDroneInfo from '../../constants/images/black-drone-info.png';

const DroneInfo = ({drone, type}) => {
    useEffect(() => {

    }, [drone]);

    const [elapsedTime, setElapsedTime] = useState("0:0:0");

    useEffect(() => {
        if (drone?.placementTime) {
            const startTime = new Date(drone.placementTime).getTime();

            if (!isNaN(startTime)) { // Перевірка на коректність дати
                const intervalId = setInterval(() => {
                    const currentTime = new Date().getTime();
                    const timeDifference = currentTime - startTime;

                    // Перетворюємо часовий інтервал в години, хвилини, секунди
                    const hours = Math.floor(timeDifference / 3600000);
                    const minutes = Math.floor((timeDifference % 3600000) / 60000);
                    const seconds = Math.floor((timeDifference % 60000) / 1000);

                    setElapsedTime(`${hours}:${minutes}:${seconds}`);
                }, 1000); // Оновлюємо кожну секунду

                return () => {
                    clearInterval(intervalId); // Прибрати інтервал при розмонтуванні компонента
                };
            }
        }
    }, [drone]);

    return (
        <div className={styles.droneInfo}>
            <div className={styles.droneInfo_titleContainer}>
                <img src={type === 'white' ? whiteDroneInfo : blackDroneInfo} alt="drone icon"/>
                <div className={styles.droneInfo_titleContainer_title}>
                    <h3>{drone?.droneId}</h3>
                    <p>{type === 'white' ? 'Mavic JS' : 'Unknown'}</p>
                </div>
            </div>

            <div className={styles.droneInfo_info}>
                {/*<div className={styles.droneInfo_info_session}>*/}
                {/*    <p className={styles.subtitle}>Session:</p>*/}
                {/*    <p className={styles.info}>{elapsedTime}</p>*/}
                {/*</div>*/}

                <div className={styles.droneInfo_info_onlineFrom}>
                    <p className={styles.subtitle}>Online from:</p>
                    <p className={styles.info}>{drone?.placementTime}</p>
                </div>

                <div className={styles.droneInfo_info_startedGps}>
                    <p className={styles.subtitle}>Started GPS:</p>
                    {
                        drone.startPosition &&
                        <p className={styles.info}>{drone?.startPosition[0]?.toFixed(6)}, {drone?.startPosition[1]?.toFixed(6)}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default DroneInfo;
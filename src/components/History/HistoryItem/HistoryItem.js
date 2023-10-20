import React from 'react';

import styles from './HistoryItem.module.scss';
import whiteDrone from '../../../constants/images/white-drone-info.png'
import blackDrone from '../../../constants/images/black-drone-info.png'

const HistoryItem = ({drone}) => {
    const getDate = (date) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();

        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }

    const getFlightDuration = (startDate, endDate) => {
        // const start = new Date(startDate);
        // const end = new Date(endDate);
        // const timeDiff = end - start;
        //
        // // Перетворюємо різницю в години, хвилини та секунди
        // const hours = Math.floor(timeDiff / 3600000);
        // const minutes = Math.floor((timeDiff % 3600000) / 60000);
        // const seconds = Math.floor((timeDiff % 60000) / 1000);
        //
        // return [hours, minutes, seconds];
        const start = new Date(startDate);
// Do your operations
        const end   = new Date(endDate);
        return (end.getTime() - start.getTime()) / 1000;
    }

    return (
        <div className={styles.historyItem}>
            <div className={styles.historyItem_droneIcon}>
                <img src={drone.type === 'white' ? whiteDrone : blackDrone} alt="drone icon"/>
            </div>

            <div className={styles.historyItem_info}>
                <div className={styles.historyItem_info_left}>
                    <p>{getDate(drone?.placementDate)}</p>
                    <p>{drone?.droneId}</p>
                </div>

                <div className={styles.historyItem_info_right}>
                    <p>{getFlightDuration(drone?.placementDate, new Date())} sec ago</p>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;
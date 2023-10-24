import React, {useState} from 'react';

import styles from './MainLayout.module.scss';
import AppMapBox from '../../components/AppMapBox/AppMapBox';
import MiniSidebar from "../../components/MiniSidebar/MiniSidebar";
import ReactMapGL, {Marker} from "react-map-gl";
import Map, {NavigationControl} from 'react-map-gl';
import AppMapBoxLayout from "../../components/AppMapBoxLayout/AppMapBoxLayout";
import SidebarDrones from "../../components/SidebarDrones/SidebarDrones";
import History from "../../components/History/History";
import DetailedDroneInfo from "../../components/DetailedDroneInfo/DetailedDroneInfo";
import AllDronesCharts from "../../components/Charts/AllDronesCharts/AllDronesCharts";
import {UserData} from "../../constants/UserData";

const MainLayout = () => {
    const [selectedOption, setSelectedOption] = useState('menu');

    // const [userData, setUserData] = useState({
    //     labels: UserData.map((data) => data.year),
    //     datasets: [
    //         {
    //             label: "",
    //             data: UserData.map((data) => data.userGain),
    //             backgroundColor: [
    //                 "rgba(75,192,192,1)",
    //                 "#ecf0f1",
    //                 "#50AF95",
    //                 "#f3ba2f",
    //                 "#2a71d0",
    //             ],
    //             borderColor: "black",
    //             borderWidth: 2,
    //         },
    //     ],
    //     // options: {
    //     //     legend: {
    //     //         display: false, // Приховати легенду
    //     //     },
    //     // },
    // });


    return (
        <div className={styles.mainLayout}>
            <MiniSidebar
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />

            {
                // selectedOption === 'menu' && <AllDronesCharts chartData={userData}/>
            }

            {
                selectedOption === 'drone' && <SidebarDrones/>
            }

            {
                selectedOption === 'history' && <History/>
            }
            <AppMapBox/>
            {/*<DetailedDroneInfo/>*/}
        </div>
    );
};

export default MainLayout;
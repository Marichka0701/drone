import React, {useState} from 'react';

import styles from './MainLayout.module.scss';
import AppMapBox from '../../components/AppMapBox/AppMapBox';
import MiniSidebar from "../../components/MiniSidebar/MiniSidebar";
import ReactMapGL, {Marker} from "react-map-gl";
import Map, {NavigationControl} from 'react-map-gl';
import AppMapBoxLayout from "../../components/AppMapBoxLayout/AppMapBoxLayout";
import SidebarDrones from "../../components/SidebarDrones/SidebarDrones";
import History from "../../components/History/History";

const MainLayout = () => {
    const [selectedOption, setSelectedOption] = useState('menu');

    return (
        <div className={styles.mainLayout}>
            <MiniSidebar
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />

            {
                selectedOption === 'drone' && <SidebarDrones/>
            }

            {
                selectedOption === 'history' && <History/>
            }

            {/*{*/}
            {/*    selectedOption === 'drone' && <SidebarDrones/>*/}
            {/*}*/}
            {/*<AppMapBoxLayout/>*/}
            <AppMapBox/>
        </div>
    );
};

export default MainLayout;
import React, {useState} from 'react';

import styles from './MainLayout.module.scss';
import AppMapBox from '../../components/AppMapBox/AppMapBox';
import MiniSidebar from "../../components/MiniSidebar/MiniSidebar";
import ReactMapGL, {Marker} from "react-map-gl";
import Map, {NavigationControl} from 'react-map-gl';
import AppMapBoxLayout from "../../components/AppMapBoxLayout/AppMapBoxLayout";

const MainLayout = () => {

    return (

        // <div style={{width: '100vw', height: '100vh'}}>
        //     <ReactMapGL
        //         width={'100%'}
        //         height={'100%'}
        //         {...viewPort}
        //         transitionDuration={'200'}
        //         mapStyle={'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4'}
        //         mapboxApiAccessToken={'pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ'}
        //     ></ReactMapGL>
        //
        // </div>



        <div className={styles.mainLayout}>
            <MiniSidebar/>
            {/*<AppMapBoxLayout/>*/}
            <AppMapBox/>
        </div>
    );
};

export default MainLayout;
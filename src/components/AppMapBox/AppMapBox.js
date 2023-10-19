// import React, {useState} from 'react';
// import {ReactMapGL, Map, NavigationControl, Marker, GeolocateControl} from 'react-map-gl';
//
//
//
// const AppMapBox = () => {
//     return (
//         <div className={styles.mapContainer}>
//             {/*<Map*/}
//             {/*    initialViewState={{*/}
//             {/*        zoom: 10,*/}
//             {/*        longitude: 71.4558,*/}
//             {/*        latitude: 51.1076,*/}
//             {/*    }}*/}
//             {/*    mapStyle={'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4'}*/}
//             {/*    mapboxAccessToken={'pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ'}*/}
//             {/*>*/}
//             {/*    <Marker longitude={71.4558} latitude={51.1076} offsetLeft={-20} // Задайте власне значення відступу*/}
//             {/*            offsetTop={-20}/>*/}
//             {/*    <NavigationControl position="bottom-right"/>*/}
//             {/*    <GeolocateControl/>*/}
//             {/*</Map>*/}
//             <Map
//                 mapboxAccessToken="pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ"
//                 initialViewState={{
//                     longitude: 71.4558,
//                     latitude: 51.1076,
//                     zoom: 10.27
//                 }}
//                 style={{width: '100%', height: '100%'}}
//                 mapStyle="mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4"
//             >
//                 <NavigationControl />
//                 <Marker longitude={'71.4558'} latitude={'51.1076'} anchor={'bottom'}></Marker>
//             </Map>
//         </div>
//     );
// }
// // const AppMapBox = () => {
// //     const [viewport, setViewport] = useState({
// //         width: '100%',
// //         height: '100%',
// //         // width: window.innerWidth,
// //         // height: window.innerWidth,
// //         // latitude: 51.1076,
// //         latitude: 45.4211,
// //         longitude: -75.6903,
// //         // longitude: 71.4558,
// //         zoom: 10,
// //     });
// //
// //     return (
// //         <div className={styles.mapContainer}>
// //             <ReactMapGL
// //                 {...viewport}
// //                 mapStyle='mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4' // Замініть YOUR_MAPBOX_ACCESS_TOKEN на свій ключ Mapbox
// //                 onViewportChange={viewport => setViewport(viewport)}
// //                 mapboxAccessToken='pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ'
// //                 // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} // Замініть YOUR_MAPBOX_ACCESS_TOKEN на свій ключ Mapbox
// //             >
// //                 mark here
// //             </ReactMapGL>
// //         </div>
// //     );
// // };
//
// export default AppMapBox;


// import React from "react";
//
// import ReactMapGL, {
//     Layer,
//     Marker,
//     NavigationControl,
//     Source,
// } from "react-map-gl";
// import {TOKEN} from "../Geocoder/Geocoder";
//
// // -26.475393195281754, 153.04416685709924
//
// const AppMapBox = ({
//                     mapRef,
//                     setNewPlace,
//                     newPlace,
//                     polygonCord,
//                     layerColor,
//                     viewport,
//                     setViewport,
//                 }) => {
//     const handleAddClick = (e) => {
//         setNewPlace({
//             lat: e?.lngLat?.lat,
//             lng: e?.lngLat?.lng,
//         });
//     };
//     const geojson = {
//         type: "Feature",
//         geometry: {
//             type: "Polygon",
//             coordinates: [polygonCord],
//         },
//     };
//
//     const layerStyle = {
//         id: "maine",
//         type: "fill",
//         source: "maine", // reference the data source
//         layout: {},
//         paint: {
//             "fill-color": layerColor || "#0080ff", // blue color fill
//             "fill-opacity": 0.5,
//         },
//     };
//     // Add a black outline around the polygon.
//     const layerOutlineStyle = {
//         id: "outline",
//         type: "line",
//         source: "maine",
//         layout: {},
//         paint: {
//             "line-color": "#000",
//             "line-width": 3,
//         },
//     };
//
//     return (
//         <ReactMapGL
//             ref={mapRef}
//             mapboxAccessToken={TOKEN}
//             initialViewState={viewport}
//             onViewportChange={(viewport) => setViewport(viewport)}
//             mapStyle="mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4"
//             onDblClick={handleAddClick}
//             transitionDuration="200"
//             attributionControl={true}
//         >
//             <Source id="my-data" type="geojson" data={geojson}>
//                 <Layer {...layerOutlineStyle} />
//                 <Layer {...layerStyle} />
//             </Source>
//
//             {newPlace ? (
//                 <Marker
//                     latitude={newPlace?.lat}
//                     longitude={newPlace?.lng}
//                     draggable
//                     onDragEnd={(e) =>
//                         setNewPlace({ lng: e.lngLat.lng, lat: e.lngLat.lat })
//                     }
//                 />
//             ) : null}
//             <NavigationControl position="bottom-right" />
//         </ReactMapGL>
//     );
// };
//
// export default AppMapBox;

// import React, {useState} from 'react';
// import ReactMapGL, {Marker} from "react-map-gl";
//
// const AppMapBox = () => {
//     const [viewPort, setViewPort] = useState({
//         // longitude: 71.4558,
//         // latitude: 51.1076,
//     });
//
//
//     return (
//         <div style={{width: '100%', height: '100%'}}>
//             <ReactMapGL
//                 // longitude={71.538700}
//                 // latitude={51.109500}
//                 mapStyle={'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4'}
//                 mapboxAccessToken={'pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ'}
//             >
//                 <Marker latitude={51.109500} longitude={71.538700} ></Marker>
//             </ReactMapGL>
//         </div>
//     );
// };
//
// export default AppMapBox;


















import React, {useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './AppMapBox.scss';
import './NavigationControl.scss';
import {geoJson, randomCoordinatesSensors, randomPoints} from "../../constants/coordinatesSensor";
import ModalSensor from "../ModalSensor/ModalSensor";

const AppMapBox = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState({});

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4',
            center: [71.413961, 51.140528],
            zoom: 10.27,
        });

        // const marker1 = new mapboxgl.Marker()
        //     .setLngLat([71.413961, 51.140528])
        //     .addTo(map);

        // const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        //     .setLngLat([71.413961, 51.140528])
        //     .addTo(map);
        const markers = geoJson.features;

        // for (const item of markers) {
        //     const marker = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        //         .setLngLat([item.longitude, item.latitude])
        //         .addTo(map);
        // }
        for (const marker of markers) {
// Create a DOM element for each marker.
            const el = document.createElement('div');
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            el.className = 'marker';
            el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
            // el.style.width = `${width}px`;
            // el.style.height = `${height}px`;
            // el.style.backgroundSize = '100%';

            el.addEventListener('mouseenter', () => {
                setModalIsOpen(true);
                setSelectedSensor(marker.properties.message);
                // window.alert(JSON.stringify(marker.properties.message));
            });

            el.addEventListener('mouseleave', () => {
                setModalIsOpen(false);
                setSelectedSensor(marker.properties.message);
            })

// Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        }

        map.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'bottom-right');

        // const popup = new mapboxgl.Popup({ closeOnClick: false })
        //     .setLngLat([71.413961, 51.140528])  // Змініть ці координати
        //     .setHTML('<h1>Hello World!</h1>')
        //     .addTo(map);
    }, []);

    console.log(selectedSensor)

    return (
        <>
            <div id="map" style={{width: '100%'}}/>

            {modalIsOpen &&
                <ModalSensor
                    selectedSensor={selectedSensor}
                    setModalIsOpen={setModalIsOpen}
                />}
        </>
        // <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
    );
};

export default AppMapBox;


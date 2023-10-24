import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './AppMapBox.scss';
import './NavigationControl.scss';
import {geoJson} from "../../constants/coordinatesSensor";
import ModalSensor from "../ModalSensor/ModalSensor";
import sensor from '../../constants/images/sensor.png';
import drone from '../../constants/images/black-drone.png';
import {useDispatch, useSelector} from "react-redux";
import {dronesHistoryActions} from "../../store/slices/dronesHistorySlice";
import whiteDrone from "../../constants/images/white-drone.png";
import blackDrone from "../../constants/images/black-drone.png";
import ShowFilter from "../ShowFilter/ShowFilter";


const AppMapBox = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState({});

    const [whiteDronesChecked, setWhiteDronesChecked] = useState(true);
    const [blackDronesChecked, setBlackDronesChecked] = useState(true);
    const [radarsChecked, setRadarsChecked] = useState(true);

    // const [selectedDroneId, setSelectedDroneId] = useState(null);


    const [activeDrone, setActiveDrone] = useState({
        droneId: null,
        durationFlight: null,
        startPosition: [],
        endPosition: [],
        minHeight: Math.floor(100 + Math.random() * (400 - 100)),
        maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
        startDate: null,
        endDate: null,
        placementTime: null,
    });

    const {activeDrones, pastDrones, dronesHistory, selectedDroneId} = useSelector(state => state.dronesHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        // const initialCoordinates = [71.413961, 51.140528];
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: 'map',
            style: process.env.REACT_APP_MAPBOX_STYLE,
            // center: [54.429070, 24.414793],
            center: [71.413961, 51.140528],
            // zoom: 10.64,
            zoom: 10.28,
        });

        const markers = geoJson.features;

        for (const marker of markers) {
            if (radarsChecked) {
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = `url(${sensor})`;

                el.addEventListener('mouseenter', () => {
                    setModalIsOpen(true);
                    setSelectedSensor(marker.properties.message);
                });

                el.addEventListener('mouseleave', () => {
                    setModalIsOpen(false);
                    setSelectedSensor(marker.properties.message);
                });

                const popupContent = document.createElement('div');

                ReactDOM.render(<ModalSensor selectedSensor={marker.properties.message}/>, popupContent);

                const popup = new mapboxgl.Popup({offset: 25}).setDOMContent(popupContent);

                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map)
                    .setPopup(popup);
            }
        }


        map.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'bottom-right');

        const AddWhiteDronesToMap = () => {
            // let placementDate;

            const addDroneToMap = () => {
                const placementTime = new Date();

                // center: [71.413961, 51.140528],
                // center: [54.429070, 24.414793],

                // const astanaLatitude = 24.315 + Math.random() * (24.414 - 24.315); // В межах міста абу дабі
                // const astanaLongitude = 54.312 + Math.random() * (54.429 - 54.312); // В межах міста абу дабі

                const astanaLatitude = 51.122 + Math.random() * (51.148 - 51.122); // В межах міста Астана
                const astanaLongitude = 71.430 + Math.random() * (71.442 - 71.430); // В межах міста Астана

                const radius = Math.random() * 0.15; // Встановіть власне значення

                const pointAroundAstana = (angle) => {
                    const newLatitude = astanaLatitude + Math.cos(angle) * radius;
                    const newLongitude = astanaLongitude + Math.sin(angle) * radius;

                    return {
                        'type': 'Point',
                        'coordinates': [newLongitude, newLatitude]
                    };
                }

                const droneId = `drone_${Math.random().toString(36).substring(7)}`;

                // map.on('click', droneId, (e) => {
                    // console.log(`Клік на дроні з ідентифікатором: ${droneId}`);
                    // dispatch(dronesHistoryActions.setSelectedDroneId(droneId));
                    // map.addLayer({
                    //         'id': droneId,
                    //         'type': 'circle',
                    //         'source': droneId,
                    //         'paint': {
                    //             'circle-radius': 10, // Adjust the size as needed
                    //             'circle-color': '#000', // Change to the color you want for the border
                    //             'circle-opacity': 1
                    //         }
                    //     // });
                    //     // 'id': droneId,
                    //     // 'source': droneId,
                    //     // 'type': 'symbol',
                    //     // 'layout': {
                    //     //     'icon-image': droneId,
                    //     //     'icon-size': 0.5,
                    //     // },
                    // });

                    // const features = map.queryRenderedFeatures(e.point, { layers: [droneId] });
                    // if (!features.length) {
                    //     return;
                    // }
                    //
                    // // const clickedDroneId = features?.source;
                    // console.log(`Клік на дроні з ідентифікатором: ${droneId}`);
                    // dispatch(dronesHistoryActions.setSelectedDroneId(droneId));
                    //
                    // // Видалення коліщаток дронів
                    // map.removeLayer(droneId + '_circle');
                    //
                    // // Додавання обведення дронів
                    // map.addLayer({
                    //     'id': droneId + '_circle',
                    //     'type': 'circle',
                    //     'source': droneId,
                    //     'paint': {
                    //         'circle-radius': 10, // Розмір коліщатка (можна змінити)
                    //         'circle-color': '#000', // Колір коліщатка (змініть на потрібний)
                    //         'circle-opacity': 1
                    //     }
                    // });








                //     map.on('click', droneId, (e) => {
                //         // Прибирання всіх коліщаток, окрім останнього вибраного
                //         const layers = map.getStyle().layers;
                //         layers.forEach((layer) => {
                //             if (layer.id.endsWith('_circle')) {
                //                 map.removeLayer(layer.id);
                //             }
                //         });
                //
                //         // Далі ви можете додати коліщатко для обраного дрона
                //         const features = map.queryRenderedFeatures(e.point, { layers: [droneId] });
                //         if (!features.length) {
                //             return;
                //         }
                //
                //         console.log(`Клік на дроні з ідентифікатором: ${droneId}`);
                //         dispatch(dronesHistoryActions.setSelectedDroneId(droneId));
                //
                //         // Додавання обведення дронів
                //         map.addLayer({
                //             'id': droneId + '_circle',
                //             'type': 'circle',
                //             'source': droneId,
                //             'paint': {
                //                 'circle-radius': 10, // Розмір коліщатка (можна змінити)
                //                 'circle-color': '#000', // Колір коліщатка (змініть на потрібний)
                //                 'circle-opacity': 1
                //             }
                //         });
                //     });
                // });

                // const placementTime = new Date();
                // const placementTime = new Date().toLocaleTimeString();

                dispatch(dronesHistoryActions.setWhiteDrones({
                    type: 'white',
                    droneId,
                    startPosition: [astanaLongitude, astanaLatitude],
                    placementTime,
                }));

                map.addSource(droneId, {
                    'type': 'geojson',
                    'data': pointAroundAstana(0)
                });

                map.loadImage(whiteDrone, (error, image) => {
                    if (error)
                        throw error;

                    map.addImage(droneId, image);
                    map.addLayer({
                    //     'id': droneId + '_border',
                    //     'type': 'circle',
                    //     'source': droneId,
                    //     'paint': {
                    //         'circle-radius': 10, // Adjust the size as needed
                    //         'circle-color': '#000', // Change to the color you want for the border
                    //         'circle-opacity': 1
                    //     }
                    // });
                        'id': droneId,
                        'source': droneId,
                        'type': 'symbol',
                        'layout': {
                            'icon-image': droneId,
                            'icon-size': 0.5,
                        },
                    });
                });

                const animateMarker = (timestamp) => {
                    map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));

                    requestAnimationFrame(animateMarker);
                }

                animateMarker(0);

                const randomTimeout = Math.random() * (80000 - 40000) + 40000;
               setTimeout(() => {
                    const endTime = new Date();

                    // const placementDate = new Date();

                    dispatch(dronesHistoryActions.removeWhiteDrones(droneId));
                    dispatch(dronesHistoryActions.setPastDrones({
                        type: 'white',
                        droneId,
                        startPosition: [astanaLongitude, astanaLatitude],
                        placementTime,
                        droneName: 'Mavic JS',
                        maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
                        minHeight: Math.floor(100 + Math.random() * (400 - 100)),
                        endTime,
                    }));

                    // map.removeLayer(droneId + '_border');
                    map.removeLayer(droneId);
                    map.removeLayer(droneId + '_circle');
                    map.removeSource(droneId);

                    addDroneToMap();
                }, randomTimeout);
            };

            map.on('style.load', () => {
                // Викликаємо функцію для додавання першого дрону після завантаження стилю
                addDroneToMap();

                // Встановлюємо інтервал для появи наступних дронів
                setInterval(addDroneToMap, Math.random() * (40000 - 80000) + 80000);
            });
        };


        const AddBlackDronesToMap = () => {
            const addDroneToMap = (radius) => {
                // const astanaLatitude = 24.315 + Math.random() * (24.414 - 24.315); // В межах міста абу дабі
                // const astanaLongitude = 54.312 + Math.random() * (54.429 - 54.312); // В межах міста абу дабі

                const astanaLatitude = 51.122 + Math.random() * (51.148 - 51.122); // В межах міста Астана
                const astanaLongitude = 71.430 + Math.random() * (71.442 - 71.430); // В межах міста Астана

                // const astanaLatitude = 51.122 + Math.random() * (51.148 - 51.122);
                // const astanaLongitude = 71.430 + Math.random() * (71.442 - 71.430);
                // const astanaLatitude = 51.1 + Math.random() * (51.25 - 51.1);
                // const astanaLongitude = 71.2 + Math.random() * (71.45 - 71.2);

                const pointAroundAstana = (angle) => {
                    const newLatitude = astanaLatitude + Math.cos(angle) * radius;
                    const newLongitude = astanaLongitude + Math.sin(angle) * radius;

                    return {
                        'type': 'Point',
                        'coordinates': [newLongitude, newLatitude]
                    };
                }

                const droneId = `drone_${Math.random().toString(36).substring(7)}`;

                const placementTime = new Date(); // Генерувати унікальний час розміщення

                dispatch(dronesHistoryActions.setBlackDrones({
                    type: 'black',
                    droneId,
                    startPosition: [astanaLongitude, astanaLatitude],
                    placementTime,
                }));

                map.addSource(droneId, {
                    'type': 'geojson',
                    'data': pointAroundAstana(0)
                });

                map.loadImage(blackDrone, (error, image) => {
                    if (error)
                        throw error;
                    map.addImage(droneId, image);
                    map.addLayer({
                        'id': droneId,
                        'source': droneId,
                        'type': 'symbol',
                        'layout': {
                            'icon-image': droneId,
                            'icon-size': 0.5,
                        }
                    });
                });

                const animateMarker = (timestamp) => {
                    map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));

                    requestAnimationFrame(animateMarker);
                }

                animateMarker(0);

                const randomTimeout = Math.random() * (80000 - 40000) + 40000;
                blackDronesChecked && setTimeout(() => {
                    const endTime = new Date();

                    // const placementDate = new Date();

                    dispatch(dronesHistoryActions.removeBlackDrones(droneId));
                    dispatch(dronesHistoryActions.setPastDrones({
                        placementTime,
                        droneName: 'Mavic JS',
                        maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
                        minHeight: Math.floor(100 + Math.random() * (400 - 100)),
                        endTime,
                        type: 'black',
                        droneId,
                        startPosition: [astanaLongitude, astanaLatitude],
                    }));

                    map.removeLayer(droneId);
                    map.removeSource(droneId);

                    addDroneToMap(radius);
                }, randomTimeout);
            };

            map.on('style.load', () => {
                setInterval(() => {
                    addDroneToMap(Math.random() * (0.2 - 0.05) + 0.05);
                }, Math.random() * (80000 - 40000) + 40000);
            });
        };


        whiteDronesChecked && AddWhiteDronesToMap()

        blackDronesChecked && AddBlackDronesToMap()

    }, [blackDronesChecked, whiteDronesChecked, radarsChecked]);


    return (
        <>
            {/*<div id="map" style={{width: '100%'}}>*/}
            {/*    <ShowFilter/>*/}
            {/*</div>*/}
            <div id={'map'} style={{width: '100%', position: "relative"}}>
                {/*<ShowFilter*/}
                {/*    whiteDronesChecked={whiteDronesChecked}*/}
                {/*    blackDronesChecked={blackDronesChecked}*/}
                {/*    radarsChecked={radarsChecked}*/}
                {/*    setWhiteDronesChecked={setWhiteDronesChecked}*/}
                {/*    setBlackDronesChecked={setBlackDronesChecked}*/}
                {/*    setRadarsChecked={setRadarsChecked}*/}
                {/*/>*/}
            </div>
            {/*<div id={'map'} style={{width: '100%', position: "relative"}}/>*/}
            {/*<ShowFilter/>*/}
        </>
    );
};

export default AppMapBox;


import React, {useEffect, useState} from 'react';
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
import {AddWhiteDronesToMap} from "../../constants/addWhiteDrones";
import {AddBlackDronesToMap} from "../../constants/addBlackDrones";
import whiteDrone from "../../constants/images/white-drone.png";
import blackDrone from "../../constants/images/black-drone.png";


const AppMapBox = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState({});
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


    const {activeDrones, pastDrones, dronesHistory} = useSelector(state => state.dronesHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        const initialCoordinates = [71.413961, 51.140528];
        mapboxgl.accessToken = 'pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4',
            center: [71.413961, 51.140528],
            zoom: 10.28,
        });

        const markers = geoJson.features;

        for (const marker of markers) {
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
            })

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        }

        map.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'bottom-right');

        // const addDroneToMap = (radius) => {
        //     const astanaLatitude = 51.1 + Math.random() * (51.25 - 51.1);
        //     const astanaLongitude = 71.2 + Math.random() * (71.45 - 71.2);
        //
        //     const pointAroundAstana = (angle) => {
        //         const newLatitude = astanaLatitude + Math.cos(angle) * radius;
        //         const newLongitude = astanaLongitude + Math.sin(angle) * radius;
        //
        //         return {
        //             'type': 'Point',
        //             'coordinates': [newLongitude, newLatitude]
        //         };
        //     }
        //
        //     const droneId = `drone_${Math.random().toString(36).substring(7)}`;
        //
        //     dispatch(dronesHistoryActions.setActiveDrones({
        //         droneId,
        //         startPosition: [astanaLongitude, astanaLatitude],
        //         placementTime: new Date().toLocaleTimeString(),
        //     }));
        //
        //     map.addSource(droneId, {
        //         'type': 'geojson',
        //         'data': pointAroundAstana(0)
        //     });
        //
        //     map.loadImage(drone, (error, image) => {
        //         if (error)
        //             throw error;
        //         map.addImage(droneId, image);
        //         map.addLayer({
        //             'id': droneId,
        //             'source': droneId,
        //             'type': 'symbol',
        //             'layout': {
        //                 'icon-image': droneId,
        //                 'icon-size': 0.5,
        //             }
        //         });
        //     });
        //
        //     const animateMarker = (timestamp) => {
        //         map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));
        //
        //         requestAnimationFrame(animateMarker);
        //     }
        //
        //     animateMarker(0);
        //
        //     const randomTimeout = Math.random() * (30000 - 3000) + 3000;
        //     setTimeout(() => {
        //         const endDate = new Date();
        //
        //         dispatch(dronesHistoryActions.removeActiveDrone(droneId));
        //         dispatch(dronesHistoryActions.setPastDrones({
        //             droneId,
        //             startPosition: [astanaLongitude, astanaLatitude],
        //             placementTime: new Date().toLocaleTimeString(),
        //         }));
        //
        //         map.removeLayer(droneId);
        //         map.removeSource(droneId);
        //
        //         addDroneToMap(radius);
        //     }, randomTimeout);
        // };
        //
        //
        // map.on('style.load', () => {
        //
        //     setInterval(() => {
        //         addDroneToMap(Math.random() * (0.2 - 0.09) + 0.09);
        //     }, Math.random() * (20000 - 5000) + 5000);
        // })

        // AddBlackDronesToMap(dispatch);

        // AddWhiteDronesToMap(dispatch);

        // const AddWhiteDronesToMap = () => {
        //
        //     const addDroneToMap = (radius) => {
        //         const astanaLatitude = 51.122  + Math.random() * (51.148 - 51.122);
        //         const astanaLongitude = 71.430 + Math.random() * (71.442 - 71.430);
        //
        //         const pointAroundAstana = (angle) => {
        //             const newLatitude = astanaLatitude + Math.cos(angle) * radius;
        //             const newLongitude = astanaLongitude + Math.sin(angle) * radius;
        //
        //             return {
        //                 'type': 'Point',
        //                 'coordinates': [newLongitude, newLatitude]
        //             };
        //         }
        //
        //         const droneId = `drone_${Math.random().toString(36).substring(7)}`;
        //
        //         const placementTime = new Date().toLocaleTimeString(); // Генерувати унікальний час розміщення
        //
        //         dispatch(dronesHistoryActions.setWhiteDrones({
        //             type: 'white',
        //             droneId,
        //             startPosition: [astanaLongitude, astanaLatitude],
        //             placementTime,
        //         }));
        //
        //         map.addSource(droneId, {
        //             'type': 'geojson',
        //             'data': pointAroundAstana(0)
        //         });
        //
        //         map.loadImage(whiteDrone, (error, image) => {
        //             if (error)
        //                 throw error;
        //             map.addImage(droneId, image);
        //             map.addLayer({
        //                 'id': droneId,
        //                 'source': droneId,
        //                 'type': 'symbol',
        //                 'layout': {
        //                     'icon-image': droneId,
        //                     'icon-size': 0.5,
        //                 }
        //             });
        //         });
        //
        //         const animateMarker = (timestamp) => {
        //             map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));
        //
        //             console.log(map.getSource(droneId))
        //
        //             requestAnimationFrame(animateMarker);
        //         }
        //
        //         animateMarker(0);
        //
        //         const randomTimeout = Math.random() * (80000 - 40000) + 40000;
        //         setTimeout(() => {
        //             const endDate = new Date();
        //
        //             dispatch(dronesHistoryActions.removeWhiteDrones(droneId));
        //             dispatch(dronesHistoryActions.setPastDrones({
        //                 droneId,
        //                 startPosition: [astanaLongitude, astanaLatitude],
        //                 placementTime, // Використовувати той же час розміщення
        //             }));
        //
        //             map.removeLayer(droneId);
        //             map.removeSource(droneId);
        //
        //             addDroneToMap(radius);
        //         }, randomTimeout);
        //     };
        //
        //     map.on('style.load', () => {
        //         setInterval(() => {
        //             addDroneToMap(0.09);
        //             // addDroneToMap(Math.random() * (0.2 - 0.09) + 0.09);
        //         }, Math.random() * (20000 - 30000) + 30000);
        //     });
        // };


        const AddWhiteDronesToMap = () => {
            const addDroneToMap = () => {
                const astanaLatitude = 51.122 + Math.random() * (51.148 - 51.122); // В межах міста Астана
                const astanaLongitude = 71.430 + Math.random() * (71.442 - 71.430); // В межах міста Астана

                // Визначаємо випадковий радіус в межах міста Астана, щоб дрони з'являлися далеко один від одного
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
                const placementTime = new Date().toLocaleTimeString();

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
                setTimeout(() => {
                    const endDate = new Date();

                    const placementDate = new Date();

                    dispatch(dronesHistoryActions.removeWhiteDrones(droneId));
                    dispatch(dronesHistoryActions.setPastDrones({
                        type: 'white',
                        droneId,
                        startPosition: [astanaLongitude, astanaLatitude],
                        placementDate,
                    }));

                    map.removeLayer(droneId);
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
                const astanaLatitude = 51.122  + Math.random() * (51.148 - 51.122);
                const astanaLongitude = 71.430 + Math.random() * (71.442 - 71.430);
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

                const placementTime = new Date().toLocaleTimeString(); // Генерувати унікальний час розміщення

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
                setTimeout(() => {
                    const endDate = new Date();

                    const placementDate = new Date();

                    dispatch(dronesHistoryActions.removeBlackDrones(droneId));
                    dispatch(dronesHistoryActions.setPastDrones({
                        type: 'black',
                        droneId,
                        startPosition: [astanaLongitude, astanaLatitude],
                        placementDate, // Використовувати той же час розміщення
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

        AddWhiteDronesToMap();
        AddBlackDronesToMap();
    }, []);

    return (
        <>
            <div id="map" style={{width: '100%'}}/>

            {modalIsOpen &&
                <ModalSensor
                    selectedSensor={selectedSensor}
                    setModalIsOpen={setModalIsOpen}
                />}
        </>
    );
};

export default AppMapBox;


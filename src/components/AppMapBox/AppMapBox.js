// import React, {useEffect, useState} from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import './AppMapBox.scss';
// import './NavigationControl.scss';
// import {geoJson, randomCoordinatesSensors, randomPoints} from "../../constants/coordinatesSensor";
// import ModalSensor from "../ModalSensor/ModalSensor";
// import MovingObject from "../MovingDrone/MovingDrone";
// import sensor from '../../constants/images/sensor.png'
// import drone from '../../constants/images/dron.png';
// import {dronesCoordinates} from "../../constants/dronesCoordinates";
//
// const AppMapBox = () => {
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [selectedSensor, setSelectedSensor] = useState({});
//
//
//     useEffect(() => {
//         const initialCoordinates = [71.413961, 51.140528];
//         mapboxgl.accessToken = 'pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ';
//
//         const map = new mapboxgl.Map({
//             container: 'map',
//             style: 'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4',
//             center: [71.413961, 51.140528],
//             zoom: 10.27,
//         });
//
//         const markers = geoJson.features;
//
//         for (const marker of markers) {
//             const el = document.createElement('div');
//             el.className = 'marker';
//             el.style.backgroundImage = `url(${sensor})`;
//
//             el.addEventListener('mouseenter', () => {
//                 setModalIsOpen(true);
//                 setSelectedSensor(marker.properties.message);
//             });
//
//             el.addEventListener('mouseleave', () => {
//                 setModalIsOpen(false);
//                 setSelectedSensor(marker.properties.message);
//             })
//
//             new mapboxgl.Marker(el)
//                 .setLngLat(marker.geometry.coordinates)
//                 .addTo(map);
//         }
//
//         map.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'bottom-right');
//         console.log(dronesCoordinates);
//
//         const radius = 0.09;
//         // const radius = item;
//
//         const pointAroundAstana = (angle) => {
//             const astanaLatitude = 51.140528;
//             const astanaLongitude = 71.413961;
//
//             const newLatitude = astanaLatitude + Math.cos(angle) * radius;
//             const newLongitude = astanaLongitude + Math.sin(angle) * radius;
//
//             return {
//                 'type': 'Point',
//                 'coordinates': [newLongitude, newLatitude]
//             };
//         }
//
//         map.on('load', () => {
//             // Додаємо джерело та шар для точки
//             map.addSource(`point`, {
//                 'type': 'geojson',
//                 'data': pointAroundAstana(0, radius)
//             });
//
//             map.loadImage(drone, (error, image) => {
//                 if (error)
//                     throw error;
//                 map.addImage('marker', image);
//                 map.addLayer({
//                     'id': `point`,
//                     'source': 'point',
//                     'type': 'symbol',
//                     'layout': {
//                         'icon-image': 'marker',
//                         'icon-size': 1
//                     }
//                 });
//             });
//
//             const animateMarker = (timestamp) => {
//                 map.getSource(`point`)?.setData(pointAroundAstana(timestamp / 20000, radius));
//
//                 requestAnimationFrame(animateMarker);
//             }
//
//             animateMarker(0);
//
//             // setTimeout(() => {
//             //     // Видаляємо джерело та шар
//             //     map.removeLayer(`point`);
//             //     map.removeSource(`point`);
//             // }, 7000); // 7 секунд
//         });
//
//         // dronesCoordinates.map((item, index) => {
//         //
//         // })
//         // const pointAroundAstana = (angle) => {
//         //     const astanaLatitude = 51.140528;
//         //     const astanaLongitude = 71.413961;
//         //
//         //     const newLatitude = astanaLatitude + Math.cos(angle) * radius;
//         //     const newLongitude = astanaLongitude + Math.sin(angle) * radius;
//         //
//         //     return {
//         //         'type': 'Point',
//         //         'coordinates': [newLongitude, newLatitude]
//         //     };
//         // }
//         //
//         // map.on('load', () => {
//         //     // Додаємо джерело та шар для точки
//         //     map.addSource('point', {
//         //         'type': 'geojson',
//         //         'data': pointAroundAstana(0, radius)
//         //     });
//         //
//         //     map.loadImage(drone, (error, image) => {
//         //         if (error)
//         //             throw error;
//         //         map.addImage('marker', image);
//         //         map.addLayer({
//         //             'id': `point${radius}`,
//         //             'source': 'point',
//         //             'type': 'symbol',
//         //             'layout': {
//         //                 'icon-image': 'marker',
//         //                 'icon-size': 1
//         //             }
//         //         });
//         //     });
//         //
//         //     const animateMarker = (timestamp) => {
//         //         map.getSource(`point${radius}`).setData(pointAroundAstana(timestamp / 20000, radius));
//         //
//         //         requestAnimationFrame(animateMarker);
//         //     }
//         //
//         //     animateMarker(0);
//         // });
//     }, []);
//
//     return (
//         <>
//             <div id="map" style={{width: '100%'}}/>
//
//             {modalIsOpen &&
//                 <ModalSensor
//                     selectedSensor={selectedSensor}
//                     setModalIsOpen={setModalIsOpen}
//                 />}
//         </>
//     );
// };
//
// export default AppMapBox;
//


import React, {useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './AppMapBox.scss';
import './NavigationControl.scss';
import {geoJson} from "../../constants/coordinatesSensor";
import ModalSensor from "../ModalSensor/ModalSensor";
import sensor from '../../constants/images/sensor.png';
import drone from '../../constants/images/dron.png';
import {useDispatch, useSelector} from "react-redux";
import {dronesHistoryActions} from "../../store/slices/dronesHistorySlice/dronesHistorySlice";


const AppMapBox = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState({});
    // const [activeDrones, setActiveDrones] = useState([]);
    // const [activeDrone, setActiveDrone] = useState({
    //     droneId: null,
    //     durationFlight: null,
    //     startPosition: [],
    //     endPosition: [],
    //     minHeight: Math.floor(100 + Math.random() * (400 - 100)),
    //     maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
    //     startDate: null,
    //     endDate: null,
    //     placementTime: null,
    // });


    const [newActiveDrone, setNewActiveDrone] = useState({
        droneId: null,
        startPosition: [],
        placementTime: null,
    });

    const {activeDrones, pastDrones, dronesHistory} = useSelector(state => state.dronesHistory);
    const dispatch = useDispatch();
    // const [activeDrones, setActiveDrones] = useState([]); // Масив активних дронів
    // console.log(activeDrones, 'activeDrones')
    // const [pastDrones, setPastDrones] = useState([]);

    console.log(activeDrones, 'activeDrones')
    console.log(newActiveDrone, 'newActiveDrone')


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

        const addDroneToMap = (radius) => {
            const astanaLatitude = 51.1 + Math.random() * (51.25 - 51.1);
            const astanaLongitude = 71.2 + Math.random() * (71.45 - 71.2);

            // const currentActiveDrone = {...activeDrone};
            // currentActiveDrone.startDate = new Date().toLocaleDateString();
            // currentActiveDrone.placementTime = new Date().toLocaleTimeString();

            // setNewActiveDrone((prev) => ({
            //         ...prev,
            //         placementTime: new Date().toLocaleTimeString(),
            //     })
            // );

            const pointAroundAstana = (angle) => {
                const newLatitude = astanaLatitude + Math.cos(angle) * radius;
                const newLongitude = astanaLongitude + Math.sin(angle) * radius;

                return {
                    'type': 'Point',
                    'coordinates': [newLongitude, newLatitude]
                };
            }

            const droneId = `drone_${Math.random().toString(36).substring(7)}`;

            // dispatch(dronesHistoryActions.setActiveDrones([...activeDrones, droneId]));


            // currentActiveDrone.startPosition = [astanaLongitude, astanaLatitude];
            // currentActiveDrone.droneId = droneId;
            // setNewActiveDrone((prev) => ({
            //     ...prev,
            //     droneId,
            //     startPosition: [astanaLongitude, astanaLatitude],
            // }));

            dispatch(dronesHistoryActions.setActiveDrones({
                droneId,
                startPosition: [astanaLongitude, astanaLatitude],
                placementTime: new Date().toLocaleTimeString(),
            }));
            // setActiveDrones((prevActiveDrones) => [
            //     ...prevActiveDrones,
            //     {
            //         droneId,
            //         startPosition: [astanaLongitude, astanaLatitude],
            //         placementTime: new Date().toLocaleTimeString(),
            //     }
            // ]);

            // setActiveDrone(currentActiveDrone);

            // Додаємо інформацію про дрон до історії
            // dispatch(dronesHistoryActions.addDroneToHistory(activeDrone));

            map.addSource(droneId, {
                'type': 'geojson',
                'data': pointAroundAstana(0)
            });

            map.loadImage(drone, (error, image) => {
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

                // Оновлюємо тривалість польоту кожного кадру анімації
                // const startDate = new Date(currentActiveDrone.startDate);
                // currentActiveDrone.durationFlight = (timestamp - startDate) / 1000; // у секундах

                // Розраховуємо endDate як startDate + durationFlight
                // currentActiveDrone.endDate = new Date(startDate.getTime() + currentActiveDrone.durationFlight * 1000);

                requestAnimationFrame(animateMarker);
            }

            animateMarker(0);

            const randomTimeout = Math.random() * (30000 - 3000) + 3000;
            setTimeout(() => {
                const endDate = new Date();
                // dispatch(dronesHistoryActions.setActiveDrones(activeDrones.filter((item) => item.droneId !== droneId)));
                // dispatch(dronesHistoryActions.setActiveDrones(activeDrones.filter((id) => id !== droneId)));

                // dispatch(dronesHistoryActions.setActiveDrones(activeDrones.filter((drone) => drone.droneId !== droneId)));
                dispatch(dronesHistoryActions.removeActiveDrone(droneId));
                // setActiveDrones((prevActiveDrones) =>
                //     prevActiveDrones.filter((drone) => drone.droneId !== droneId)
                // );



                // Оновлюємо endPosition для дрона перед завершенням
                // const endCoordinates = [newA, astanaLatitude];
                // currentActiveDrone.endPosition = endCoordinates;

                map.removeLayer(droneId);
                map.removeSource(droneId);

                // Додаємо інформацію про дрон до історії
                // dispatch(dronesHistoryActions.addDroneToHistory(currentActiveDrone));

                addDroneToMap(radius);
            }, randomTimeout);
        };


        map.on('style.load', () => {
            // addDroneToMap(0.1);
            // addDroneToMap(0.06);
            // addDroneToMap(0.12);
            // addDroneToMap(0.18);
            // addDroneToMap(0.25);

            setInterval(() => {
                addDroneToMap(Math.random() * (0.2 - 0.09) + 0.09);
            }, Math.random() * (20000 - 5000) + 5000);
        })
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


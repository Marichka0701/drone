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


const AppMapBox = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState({});

    useEffect(() => {
        const initialCoordinates = [71.413961, 51.140528];
        mapboxgl.accessToken = 'pk.eyJ1IjoibmF6YXJ2ZXJneW4iLCJhIjoiY2s1djY3bjA2MDh0bTNtcXc0ODR2M2h1dSJ9.PaLSEgPewauf2KVwkv9RTQ';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4',
            center: [71.413961, 51.140528],
            zoom: 10.27,
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
            const astanaLatitude = 51.1 + Math.random() * (51.35 - 51.1);
            const astanaLongitude = 71.2 + Math.random()  * (71.5 - 71.2);
            const pointAroundAstana = (angle) => {

                const newLatitude = astanaLatitude + Math.cos(angle) * radius;
                const newLongitude = astanaLongitude + Math.sin(angle) * radius;

                return {
                    'type': 'Point',
                    'coordinates': [newLongitude, newLatitude]
                };
            }

            const droneId = `drone_${Math.random().toString(36).substring(7)}`;

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
                        'icon-size': 1
                    }
                });
            });

            const animateMarker = (timestamp) => {
                map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));

                requestAnimationFrame(animateMarker);
            }

            animateMarker(0);

            const randomTimeout = Math.random() * (30000 - 3000) + 3000;
            setTimeout(() => {
                map.removeLayer(droneId);
                map.removeSource(droneId);

                addDroneToMap(radius);
            }, randomTimeout);
        };

        map.on('style.load', () => {
            addDroneToMap(0.1);
            addDroneToMap(0.06);
            addDroneToMap(0.12);
            addDroneToMap(0.18);
            addDroneToMap(0.25);

            setInterval(() => {
                addDroneToMap(Math.random() * (0.3 - 0.09) + 0.09);
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


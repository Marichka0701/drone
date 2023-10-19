import React, {useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './AppMapBox.scss';
import './NavigationControl.scss';
import {geoJson, randomCoordinatesSensors, randomPoints} from "../../constants/coordinatesSensor";
import ModalSensor from "../ModalSensor/ModalSensor";
import MovingObject from "../MovingDrone/MovingDrone";

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


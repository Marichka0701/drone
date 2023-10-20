import React from 'react';
import drone from '../../constants/images/dron.png';

const AddDroneToMap = ({map }) => {
    const radius = 0.09;

    const pointAroundAstana = (angle) => {
        const astanaLatitude = 51.140528;
        const astanaLongitude = 71.413961;

        const newLatitude = astanaLatitude + Math.cos(angle) * radius;
        const newLongitude = astanaLongitude + Math.sin(angle) * radius;

        return {
            'type': 'Point',
            'coordinates': [newLongitude, newLatitude]
        };
    }

    map.on('load', () => {
        // Додаємо джерело та шар для точки
        map.addSource(`point`, {
            'type': 'geojson',
            'data': pointAroundAstana(0, radius)
        });

        map.loadImage(drone, (error, image) => {
            if (error)
                throw error;
            map.addImage('marker', image);
            map.addLayer({
                'id': `point`,
                'source': 'point',
                'type': 'symbol',
                'layout': {
                    'icon-image': 'marker',
                    'icon-size': 1
                }
            });
        });

        const animateMarker = (timestamp) => {
            map.getSource(`point`).setData(pointAroundAstana(timestamp / 20000, radius));

            requestAnimationFrame(animateMarker);
        }

        animateMarker(0);

        // Встановлюємо таймаут на видалення дрона через 7 секунд
        setTimeout(() => {
            // Видаляємо джерело та шар
            map.removeLayer(`point`);
            map.removeSource(`point`);
        }, 7000); // 7 секунд
    });
};

export default AddDroneToMap;
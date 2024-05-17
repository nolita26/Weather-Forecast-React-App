import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const WeatherPreview = ({ city, weather }) => {
    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

    const heatmapLayer = {
        id: 'heatmap',
        type: 'heatmap',
        source: 'weather',
        maxzoom: 9,
        paint: {
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'magnitude'],
                0, 0,
                6, 1
            ],
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 1,
                9, 3
            ],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 2,
                9, 20
            ],
            'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7, 1,
                9, 0
            ],
        }
    };

    return (
        <div className="mb-4">
        <h2 className="text-xl font-bold">{city}</h2>
        <Map initialViewState={{
            longitude: weather.coord.lon,
            latitude: weather.coord.lat,
            zoom: 10,
            }}
            style={{ width: '100%', height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Source id="weather" type="geojson" data={{
            "type": "FeatureCollection",
            "features": [
                {
                "type": "Feature",
                "properties": {
                    "magnitude": weather.main.temp
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [weather.coord.lon, weather.coord.lat]
                }
                }
            ]
            }}>
            <Layer {...heatmapLayer} />
            </Source>
        </Map>
        </div>
    );
};

export default WeatherPreview;

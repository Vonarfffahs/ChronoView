import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, } from 'react-simple-maps';
import { FaHome } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { LuLandmark } from 'react-icons/lu';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { PiCrownSimpleFill } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import './Map.css';
const mapWidth = 800;
const mapHeight = 600;
function getIconByType(type) {
    switch (type) {
        case 'city foundation':
            return _jsx(FaHome, { style: { fill: '#ff6d00' } });
        case 'battle':
            return _jsx(GiCrossedSwords, { style: { fill: '#ff0000' } });
        case 'treaty':
            return _jsx(FaHandshakeSimple, { style: { fill: '#95f052' } });
        case 'crown':
            return _jsx(PiCrownSimpleFill, { style: { fill: '#ffe857' } });
        default:
            return _jsx(LuLandmark, { style: { fill: '#212529' } });
    }
}
function Map() {
    const [events, setEvents] = useState([]);
    const [landmarks, setLandmarks] = useState([]);
    useEffect(() => {
        fetch('api/events')
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error('Error loading events:', error));
        fetch('api/landmark')
            .then((response) => response.json())
            .then((data) => setLandmarks(data))
            .catch((error) => console.error('Error loading landmarks:', error));
    }, []);
    const eventMarkers = events.map((event) => {
        return {
            name: event.name,
            description: event.description,
            date: event.date,
            type: event.type,
            coordinates: event.coordinates.coordinates,
            markerOffcet: -15,
        };
    });
    const Landmarkers = landmarks.map((landmark) => {
        return {
            name: landmark.name,
            location: landmark.location,
            coordinates: landmark.coordinates.coordinates,
            markerOffcet: -15,
        };
    });
    return (_jsxs("div", { className: "map-container", children: [_jsx("h1", { children: "Map" }), _jsx("div", { className: "map", children: _jsx(ComposableMap, { projection: "geoAzimuthalEqualArea", width: mapWidth, height: mapHeight, projectionConfig: {
                        rotate: [-10.0, -52.0, 0],
                        center: [5, -6],
                        scale: 1100,
                    }, children: _jsxs(ZoomableGroup, { translateExtent: [
                            [0, 0],
                            [mapWidth, mapHeight],
                        ], children: [_jsx(Geographies, { geography: "/europe.json", fill: "#D6D6DA", stroke: "#FFFFFF", strokeWidth: 0.5, children: ({ geographies }) => geographies.map((geo) => (_jsx(Geography, { geography: geo }, geo.rsmKey))) }), eventMarkers.map(({ name, coordinates, type }) => (_jsx(Marker, { coordinates: coordinates, className: "marker", children: getIconByType(type) }, name))), Landmarkers.map(({ name, coordinates }) => (_jsx(Marker, { coordinates: coordinates, className: "marker", children: getIconByType('') }, name)))] }) }) })] }));
}
export default Map;

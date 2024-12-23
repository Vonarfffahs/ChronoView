import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { FaHome } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { LuLandmark } from 'react-icons/lu';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { PiCrownSimpleFill } from 'react-icons/pi';

import { Event } from '../../types/events';
import { Landmark } from '../../types/landmarks';

import { useState, useEffect } from 'react';

import './Map.css';

const mapWidth = 800;
const mapHeight = 600;

function getIconByType(type: string) {
  switch (type) {
    case 'city foundation':
      return <FaHome style={{ fill: '#ff6d00' }} />;
    case 'battle':
      return <GiCrossedSwords style={{ fill: '#ff0000' }} />;
    case 'treaty':
      return <FaHandshakeSimple style={{ fill: '#95f052' }} />;
    case 'crown':
      return <PiCrownSimpleFill style={{ fill: '#ffe857' }} />;
    default:
      return <LuLandmark style={{ fill: '#212529' }} />;
  }
}

function Map() {
  const [events, setEvents] = useState<Event[]>([]);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);

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

  return (
    <div className="map-container">
      <h1>Map</h1>
      <div className="map">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          width={mapWidth}
          height={mapHeight}
          projectionConfig={{
            rotate: [-10.0, -52.0, 0],
            center: [5, -6],
            scale: 1100,
          }}
        >
          <ZoomableGroup
            translateExtent={[
              [0, 0],
              [mapWidth, mapHeight],
            ]}
          >
            <Geographies
              geography="/europe.json"
              fill="#D6D6DA"
              stroke="#FFFFFF"
              strokeWidth={0.5}
            >
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>

            {/* from fetch events */}
            {eventMarkers.map(({ name, coordinates, type }) => (
              <Marker
                key={name}
                coordinates={coordinates as [number, number]}
                className="marker"
              >
                {getIconByType(type)}
              </Marker>
            ))}

            {/* from fetch landmark*/}
            {Landmarkers.map(({ name, coordinates }) => (
              <Marker
                key={name}
                coordinates={coordinates as [number, number]}
                className="marker"
              >
                {getIconByType('')}
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Map;

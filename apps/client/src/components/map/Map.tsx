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
import { MarkerType } from '../../types/marker';

import './Map.css';

const mapWidth = 800;
const mapHeight = 600;
const markers: MarkerType[] = [
  {
    name: 'Rome',
    type: 'city foundation',
    year: -753,
    markerOffcet: -15,
    coordinates: [12.4822, 41.8967],
  },
  {
    name: 'Byzantium',
    type: 'city foundation',
    year: -667,
    markerOffcet: -15,
    coordinates: [28.4, 41.6152],
  },
  {
    name: 'Battle of Messana',
    type: 'battle',
    year: -264,
    markerOffcet: -15,
    coordinates: [15.05, 38.5],
  },
];

function getIconByType(type: string) {
  switch (type) {
    case 'city foundation':
      return <FaHome style={{ fill: '#ff6d00' }} />;
    case 'battle':
      return <GiCrossedSwords style={{ fill: '#ff0000' }} />;
    default:
      return <LuLandmark style={{ fill: '#212529' }} />;
  }
}

function Map() {
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
            {markers.map(({ name, markerOffcet, coordinates, year, type }) => (
              <Marker key={name} coordinates={coordinates} className="marker">
                {getIconByType(type)}
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Map;

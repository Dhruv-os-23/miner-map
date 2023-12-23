import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import iconUrl from './assets/placeholder.png';
import './App.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet-routing-machine';

function Routing({ markers }) {
  const map = useMap();
  const routingControlRef = useRef();

  useEffect(() => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    const waypoints = markers.map((marker) => L.latLng(marker.geocode));
    routingControlRef.current = L.Routing.control({
      waypoints,
      routeWhileDragging: true,
      show: false,
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, markers]);

  return null;
}

function App() {
  const markers = [
    {
      geocode: [17.3334, 78.331],
      popUp: 'miner 1',
      quality: '30'
    },
    {
      geocode: [17.3328, 78.339],
      popUp: 'Nearest good quality ore',
      quality: '60'
    }
  ];

  const customIcon = new Icon({
    iconUrl: iconUrl,
    iconSize: [38, 38],
  });

  return (
    <>
      <MapContainer center={[17.321, 78.328]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.de/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup chunkedLoading>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <Routing markers={markers} />
      </MapContainer>
    </>
  );
}

export default App;
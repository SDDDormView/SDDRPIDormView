'use client';

import { createContext } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons not showing up in Webpack/Vite builds
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Home() {
  const position = [51.505, -0.09];

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden">
      {/* this goes behind the header so it doesn't look like whitespace */}
      <div className="h-18 bg-black flex shrink-0">

      </div>
      <div className="flex-1 relative"> 
        <MapContainer 
          center={position} 
          zoom={13} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>popup text</Popup>
          </Marker>
        </MapContainer>
      </div>
    </main>
  );
}
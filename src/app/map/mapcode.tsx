'use client';

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DormLocation, DiningLocation } from "../../lib/Location";

// Fix for default marker icons not showing up in Webpack/Vite builds
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: typeof markerIcon === 'string' ? markerIcon : (markerIcon as any).src,
    shadowUrl: typeof markerShadow === 'string' ? markerShadow : (markerShadow as any).src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Home() {
  //keep as center of map
  const centerpos: [number, number] = [42.729183, -73.679850];

  //dorm location objects
  const barton = new DormLocation(42.72910797928449, -73.67409106522192, "Barton Hall");
  const bray = new DormLocation(42.72875332963004, -73.67387648850246, "Bray Hall");
  const cary = new DormLocation(42.72884199223127, -73.67449339654603, "Cary Hall");
  const barh = new DormLocation(42.731023052315585, -73.67123451275064, "Burdett Avenue Residence Hall");
  const crockett = new DormLocation(42.728322821607065, -73.67360424451978, "Crocket Hall");
  const hall = new DormLocation(42.728519850805135, -73.67490779803794, "Hall Hall");
  const warren = new DormLocation(42.72791890978136, -73.67505800172994, "Warren Hall");
  const nason = new DormLocation(42.72772975993073, -73.67381613901617, "Nason Hall");
  const nugent = new DormLocation(42.727556372061, -73.67492925570347, "Nugent Hall");
  const davison = new DormLocation(42.727428301164174, -73.67411654641131, "Davison Hall");
  const sharp = new DormLocation(42.7270578792358, -73.67463421272612, "Sharp Hall");
  const rahpa = new DormLocation(42.73096099068158, -73.66926443034983, "RAHP A");
  const rahpb = new DormLocation(42.73485105098224, -73.66509091306483, "RAHP B");
  const stacwyck = new DormLocation(42.73355865995646, -73.66485085533262, "Stacwyck Apartments");
  const polytechnic = new DormLocation(42.72219884191547, -73.67945816583392, "Polytechnic Residence Commons");
  const blitman = new DormLocation(42.731456496603734, -73.68578013217467, "Blitman Residence Hall");
  const ecomplex = new DormLocation(42.73139837580355, -73.67919665004949, "E Complex");
  const north = new DormLocation(42.731373748331926, -73.67985110904337, "North Hall");
  const quad = new DormLocation(42.730210335358784, -73.67763158111872, "Quadrangle Complex");
  //dining location objects
  const barh_d = new DiningLocation(42.73127917870334, -73.6711661161813, "BARH Dining Hall");
  const commons = new DiningLocation(42.72841542509008, -73.67447462103848, "Commons Dining Hall");
  const sage = new DiningLocation(42.729769001066344, -73.67828469905682, "Russell Sage Dining Hall");
  const blitman_d = new DiningLocation(42.731451571043124, -73.68569027806582, "Blitman Dining Hall");

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden">
      {/* this goes behind the header so it doesn't look like whitespace */}
      <div className="h-18 bg-black flex shrink-0">

      </div>
      <div className="flex-1 relative">
        <MapContainer
          center={centerpos}
          zoom={15.2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[barton.lat, barton.long]}>
            <Popup>{barton.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[bray.lat, bray.long]}>
            <Popup>{bray.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[cary.lat, cary.long]}>
            <Popup>{cary.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[barh.lat, barh.long]}>
            <Popup>{barh.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[crockett.lat, crockett.long]}>
            <Popup>{crockett.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[hall.lat, hall.long]}>
            <Popup>{hall.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[warren.lat, warren.long]}>
            <Popup>{warren.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[nason.lat, nason.long]}>
            <Popup>{nason.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[nugent.lat, nugent.long]}>
            <Popup>{nugent.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[davison.lat, davison.long]}>
            <Popup>{davison.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[sharp.lat, sharp.long]}>
            <Popup>{sharp.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[rahpa.lat, rahpa.long]}>
            <Popup>{rahpa.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[rahpb.lat, rahpb.long]}>
            <Popup>{rahpb.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[stacwyck.lat, stacwyck.long]}>
            <Popup>{stacwyck.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[polytechnic.lat, polytechnic.long]}>
            <Popup>{polytechnic.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[blitman.lat, blitman.long]}>
            <Popup>{blitman.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[ecomplex.lat, ecomplex.long]}>
            <Popup>{ecomplex.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[north.lat, north.long]}>
            <Popup>{north.get_info().dorm_name}</Popup>
          </Marker>
          <Marker position={[quad.lat, quad.long]}>
            <Popup>{quad.get_info().dorm_name}</Popup>
          </Marker>

          <CircleMarker center={[barh_d.lat, barh_d.long]} pathOptions={{ color: 'red' }}>
            <Popup>{barh_d.get_info().dining_name}</Popup>
          </CircleMarker>
          <CircleMarker center={[sage.lat, sage.long]} pathOptions={{ color: 'red' }}>
            <Popup>{sage.get_info().dining_name}</Popup>
          </CircleMarker>
          <CircleMarker center={[commons.lat, commons.long]} pathOptions={{ color: 'red' }}>
            <Popup>{commons.get_info().dining_name}</Popup>
          </CircleMarker>
          <CircleMarker center={[blitman_d.lat, blitman_d.long]} pathOptions={{ color: 'red' }}>
            <Popup>{blitman_d.get_info().dining_name}</Popup>
          </CircleMarker>
        </MapContainer>
      </div>
    </main>
  );
}

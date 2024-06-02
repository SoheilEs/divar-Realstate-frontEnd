import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const Icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

function Map({ data, setData }) {
  const [position, setPositon] = useState([32.4279, 53.688]);
  const MapEvents = () => {
    useMapEvents({
      async click(e) {
        setPositon([+e.latlng.lat, +e.latlng.lng]);
        const reverseGeo = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=jsonv2`
        );
        const { address } = await reverseGeo.data;
        setData({
          ...data,
          province: address.state,
          city: address.city,
          district: address.district,
          address: address.road,
          coordinate: position,
        });
      
      },
    });
    return false;
  };
  return (
    <MapContainer
      center={position}
      zoom={5}
      maxZoom={20}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={Icon}>
        <Popup>
          {data.district}
          <br />
          {data.address}
        </Popup>
      </Marker>
      <MapEvents />
    </MapContainer>
  );
}

export default Map;

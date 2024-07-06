"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

type Props = {
  lon: number;
  lan: number;
};

export default function Map({ lon, lan }: Props) {
  return (
    <div className="w-full">
      <MapContainer
        style={{
          height: "100vh",
          width: "fit-contain",
          borderRadius: "0.75rem",
          backgroundSize: "cover",
        }}
        center={[lan, lon]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

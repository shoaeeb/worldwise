import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";
function Map() {
  const [mapPosition, setMapPosition] = useState([
    40.46635901755316, 3.7133789062500004,
  ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );
  const {
    isLoading: isLoadingPosition,
    getLocation,
    position: geoLocationPostion,
  } = useGeolocation();

  useEffect(
    function () {
      if (geoLocationPostion)
        setMapPosition({
          lat: geoLocationPostion.lat,
          lng: geoLocationPostion.lng,
        });
    },
    [geoLocationPostion]
  );
  const { cities } = useCities();
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPostion && (
        <Button onClick={getLocation} type="position">
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.country}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default Map;

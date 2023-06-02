// MapComponent.jsx
import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const libraries = ["places"];

function MapComponent({ lat: initialLat, lng: initialLng, onGetAddress }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [marker, setMarker] = useState({ lat: initialLat, lng: initialLng });
  const [center, setCenter] = useState(
    initialLat
      ? { lat: initialLat, lng: initialLng }
      : { lat: 6.22298782383287, lng: -75.57393446011048 }
  );
  const [zoom, setZoom] = useState(initialLat ? 14 : 8); // initial zoom level

  const onMapClick = useCallback(async (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarker(newMarker);
    setCenter(newMarker);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.latLng.lat()}&lon=${event.latLng.lng()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (onGetAddress) {
        onGetAddress({
          address: data.display_name,
          city: data.address.city,
          state: data.address.state,
          country: data.address.country,
          zipcode: data.address.postcode,
          lat: newMarker.lat,
          lng: newMarker.lng,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  console.log("marker", marker);

  useEffect(() => {
    if (!initialLat && !initialLng) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setZoom(14);
        },
        () => null
      );
    }
  }, [initialLat, initialLng]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "80vw",
        height: "500px",
      }}
      zoom={zoom}
      center={center}
      onClick={onMapClick}
    >
      {marker && <MarkerF position={{ lat: marker.lat, lng: marker.lng }} />}
    </GoogleMap>
  );
}

export default MapComponent;

// MapComponent.jsx
import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

function MapComponent(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(8); // initial zoom level

  const defaultCenter = {
    lat: 6.22298782383287,
    lng: -75.57393446011048,
  };

  const onMapClick = useCallback(async (event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.latLng.lat()}&lon=${event.latLng.lng()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (props.onGetAddress) {
        props.onGetAddress({
          address: data.display_name,
          city: data.address.city,
          state: data.address.state,
          country: data.address.country,
          zipcode: data.address.postcode,
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setZoom(14); // zoom in when geolocation is available
      },
      () => null
    );
  }, []);

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
      {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
    </GoogleMap>
  );
}

export default MapComponent;

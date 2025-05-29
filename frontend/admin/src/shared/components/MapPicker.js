// components/MapPicker.js
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const containerStyle = {
    width: "100%",
    height: "300px"
};

// Vị trí mặc định: Hà Nội
const defaultCenter = {
    lat: 21.0285,
    lng: 105.8542
};

const MapPicker = ({ onChange }) => {
    const [position, setPosition] = useState(defaultCenter);

    const handleMapClick = useCallback((event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setPosition(newPosition);
        onChange(newPosition);
    }, [onChange]);

    return (
        <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={15}
                onClick={handleMapClick}
            >
                <Marker position={position} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapPicker;

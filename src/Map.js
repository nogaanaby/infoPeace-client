import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const participantsData = [
    { id: 1, name: 'Participant 1', country: 'Israel', location: [31.0461, 34.8516] },
    { id: 2, name: 'Participant 2', country: 'Egypt', location: [30.0444, 31.2357] },
    { id: 3, name: 'Participant 3', country: 'Jordan', location: [31.9539, 35.9106] },
    { id: 4, name: 'Participant 4', country: 'Israel', location: [31.0461, 34.8516] },
    // Add more participants as needed
];

const countryCoordinates = {
    'Israel': [31.0461, 34.8516],
    'Egypt': [30.0444, 31.2357],
    'Jordan': [31.9539, 35.9106],
    // Add more countries as needed
};

const Map = () => {
    const [countryData, setCountryData] = useState({});

    useEffect(() => {
        const aggregatedData = participantsData.reduce((acc, participant) => {
            if (!acc[participant.country]) {
                acc[participant.country] = { count: 0, location: countryCoordinates[participant.country] };
            }
            acc[participant.country].count += 1;
            return acc;
        }, {});
        setCountryData(aggregatedData);
    }, []);

    return (
        <div>
            <h1>Map Component</h1>
            <MapContainer center={[31.0461, 34.8516]} zoom={6} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                />
                {Object.entries(countryData).map(([country, data]) => (
                    <Marker key={country} position={data.location}>
                        <Popup>
                            {country}: {data.count} participants
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
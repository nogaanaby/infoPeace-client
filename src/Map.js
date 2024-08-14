import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Define country coordinates
const countryCoordinates = {
    Israel: [31.0461, 34.8516],
    Egypt: [26.8206, 30.8025],
    Jordan: [30.5852, 36.2384],
    // Add more countries as needed
};

const Map = () => {
    const [participantsData, setParticipantsData] = useState([]);
    const [countryData, setCountryData] = useState({});
    const [zoomLevel, setZoomLevel] = useState(2);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        console.log("Fetching participants data from:", apiUrl);
        fetch('http://localhost:3001/api')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched participants data:", data);
            setParticipantsData(data);
        })
        .catch(error => console.error('Error fetching participants:', error));
    }, []);

    useEffect(() => {
        const aggregatedData = participantsData.reduce((acc, participant) => {
            const key = zoomLevel > 5 ? participant.city : participant.country;
            if (!acc[key]) {
                acc[key] = { count: 0, location: zoomLevel > 5 ? participant.location : countryCoordinates[participant.country] };
            }
            acc[key].count += 1;
            return acc;
        }, {});
        setCountryData(aggregatedData);
    }, [zoomLevel, participantsData]);

    const createCustomIcon = (count) => {
        return L.divIcon({
            html: `<div style="background-color: rgba(255, 0, 0, 0.6); border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${count}</div>`,
            className: '', // Remove default class
            iconSize: [30, 30], // Size of the icon
            iconAnchor: [15, 15], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -15], // Point from which the popup should open relative to the iconAnchor
        });
    };

    const MapEvents = () => {
        useMapEvents({
            zoomend: (e) => {
                setZoomLevel(e.target.getZoom());
            },
        });
        return null;
    };

    return (
        <MapContainer center={[31.0461, 34.8516]} zoom={6} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents />
            {Object.entries(countryData).map(([key, data]) => (
                <Marker key={key} position={data.location} icon={createCustomIcon(data.count)}>
                    <Popup>
                        {key}: {data.count} participants
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
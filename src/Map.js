import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SignInForm from './SignInForm';
import env from './CONSTS.js';

const countryCoordinates = {
    Israel: [31.0461, 34.8516],
    Egypt: [26.8206, 30.8025],
    Jordan: [30.5852, 36.2384],
    Lebanon: [33.8547, 35.8623],
    Syria: [34.8021, 38.9968],
    Iraq: [33.2232, 43.6793],
    Saudi_Arabia: [23.8859, 45.0792],
    United_Arab_Emirates: [23.4241, 53.8478],
    Qatar: [25.3548, 51.1839],
    Kuwait: [29.3117, 47.4818],
    Bahrain: [26.0667, 50.5577],
    Oman: [21.4735, 55.9754],
    Yemen: [15.5527, 48.5164],
    Palestine: [31.9474, 35.2272],
};
const Map = () => {
    const [participantsData, setParticipantsData] = useState([]);
    const [countryData, setCountryData] = useState({});
    const [zoomLevel, setZoomLevel] = useState(2);
    const [selectedCondition, setSelectedCondition] = useState('');

    useEffect(() => {
        fetch(env+"/api")
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
            console.log("acc", acc);
            const key = zoomLevel > 5 ? participant.city : participant.country;
            const location = zoomLevel > 5 ? participant.location.coordinates : countryCoordinates[participant.country];

            // Check if location is valid
            if (!location || !location[0] || !location[1]) {
                console.error(`Invalid location for participant: ${participant.name}`);
                return acc;
            }

            // Filter participants based on selected condition
            if (selectedCondition && participant.condition_id !== parseInt(selectedCondition, 10)) {
                return acc;
            }

            if (!acc[key]) {

                acc[key] = { count: 0, location: zoomLevel > 5 ? participant.location.coordinates : countryCoordinates[participant.country] };
            }
            acc[key].count += 1;

            return acc;
        }, {});


        console.log("Aggregated Data:", aggregatedData);
        console.log("Zoom Level:", zoomLevel);

        setCountryData(aggregatedData);
    }, [zoomLevel, participantsData,selectedCondition]);



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
        <div>
            <div class="container-sm ">
            <div className="filter-container mb-3">
                <label htmlFor="conditionFilter" className="form-label">Filter by Condition:</label>
                <select id="conditionFilter" className="form-select" value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)}>
                    <option value="">All</option>
                    <option value="0">Level 1: Green-Line bounderies, Palastnian indepandance</option>
                    <option value="1">Level 2: I belive Israel and Palestine should be the same country for all nationalities and combined democracy</option>
                    <option value="2">Level 3: I dont care as long as there`s no more wars</option>
                </select>
            </div>
            </div>
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
        </div>
    );
};

export default Map;
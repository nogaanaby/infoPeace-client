import React, { useState,useEffect } from 'react';
import env from './CONSTS.js';

const SignInForm = () => {
    const [id, setID] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [conditionId, setConditionId] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.error("Error getting geolocation: ", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const location = {
            type: 'Point',
            coordinates: [parseFloat(latitude), parseFloat(longitude)]
        };
        const participant = { id, country, city, location, dateOfBirth, condition_id: conditionId };
        console.log("Submitting participant:", participant); // Debugging line
        handleSignIn(participant);
    };

    const handleSignIn = (participant) => {
        fetch(env+'/form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participant),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("New participant added:", data);
        })
        .catch(error => console.error('Error adding participant:', error));
    };

    return (
    <form onSubmit={handleSubmit} className="container mt-5">
        <div className="mb-3">
            <label htmlFor="id" className="form-label">ID:</label>
            <input type="text" className="form-control" id="id" value={id} onChange={(e) => setID(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label htmlFor="country" className="form-label">Country:</label>
            <input type="text" className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label htmlFor="city" className="form-label">City:</label>
            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label htmlFor="latitude" className="form-label">Latitude:</label>
            <input type="text" className="form-control" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label htmlFor="longitude" className="form-label">Longitude:</label>
            <input type="text" className="form-control" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
            <input type="date" className="form-control" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label htmlFor="conditionId" className="form-label">Condition:</label>
            <select className="form-select" id="conditionId" value={conditionId} onChange={(e) => setConditionId(e.target.value)} required>
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
    );
};

export default SignInForm;
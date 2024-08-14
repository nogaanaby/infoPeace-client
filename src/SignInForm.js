import React, { useState } from 'react';
import env from './CONSTS.js';

const SignInForm = () => {
    const [id, setID] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [conditionId, setConditionId] = useState('');

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID:</label>
                <input type="text" value={id} onChange={(e) => setID(e.target.value)} required />
            </div>
            <div>
                <label>Country:</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
            <div>
                <label>City:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div>
                <label>Latitude:</label>
                <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
            </div>
            <div>
                <label>Longitude:</label>
                <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
            </div>
            <div>
                <label>Condition:</label>
                <select value={conditionId} onChange={(e) => setConditionId(e.target.value)} required>
                    <option value="">Select an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignInForm;
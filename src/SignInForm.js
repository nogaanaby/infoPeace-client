import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from './CONSTS.js';
import ThankYou from './ThankYou';


const apiKey = '6795d462851b4d1cb57608b232b67732';

const SignInForm = () => {
  const [id, setID] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [conditionId, setConditionId] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                const location = data.results[0].components;
                setCountry(location.country);
                setCity(location.city || location.town || location.village);
              }
            })
            .catch(error => console.error("Error with reverse geocoding: ", error));
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
    fetch(env + '/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(participant),
    })
      .then(response => response.json())
      .then(data => {
        setFormCompleted(true);
        console.log("Response from server:", data);
  
      })
      .catch(error => {
        console.error("Error submitting form: ", error);
      });
  };


  if (formCompleted) {
    return <ThankYou />;
  }


  return (
    <div className="container mt-5">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">ID:</label>
        <input type="text" className="form-control" id="id" value={id} onChange={(e) => setID(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="form-label">Country:</label>
        <input type="text" className="form-control" id="country" value={country} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City:</label>
        <input type="text" className="form-control" id="city" value={city} readOnly />
      </div>
      <input type="hidden" id="latitude" value={latitude} />
      <input type="hidden" id="longitude" value={longitude} />
      <div className="mb-3">
        <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
        <input type="date" className="form-control" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="conditionId" className="form-label">I support peace in the middle east throught the following terms:</label>
        <select className="form-select" id="conditionId" value={conditionId} onChange={(e) => setConditionId(e.target.value)} required>
          <option value="">Select an option</option>
          <option value="1">Level 1: Green-Line bounderies, Palastnian indepandance</option>
          <option value="2">Level 2: I belive Israel and Palestine should be the same country for all nationalities and combined democracy</option>
          <option value="3">Level 3: I dont care as long as there`s no more wars</option>
        </select>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="consent" required />
        <label className="form-check-label" htmlFor="consent">I consent to the collection of my location data</label>
      </div>
      <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
  </div>
  );
}

export default SignInForm;
import React, { useState } from 'react';

const SignInForm = ({ onSignIn }) => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const participant = { name, country, city };
        onSignIn(participant);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Country:</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
            <div>
                <label>City:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignInForm;
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import Participants from './Participants'; 
import Map from './Map'; 
import SignInForm from './SignInForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <header className="bg-teal-700 text-white text-center py-3">
      <h1>InfoPeace</h1>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/form" element={<SignInForm />} />
      </Routes>

    </Router>
  );
}

export default App;

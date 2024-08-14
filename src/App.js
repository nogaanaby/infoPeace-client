import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes, Route, Switch,Link } from 'react-router-dom';
import Participants from './Participants'; 
import Map from './Map'; 
import SignInForm from './SignInForm';
import TXTPage from './TXTPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <header className="bg-teal-700 text-white text-center py-3">
      <nav className="navbar navbar-expand-lg navbar-dark bg-teal-700">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">InfoPeace</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">about</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/form">Sign In Form</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
        <Route path="/about" element={<TXTPage />} />
        <Route path="/form" element={<SignInForm />} />
      </Routes>

    </Router>
  );
}

export default App;

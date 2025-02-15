import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Trace from './Trace';
import Config from './Config';
import Footer from './Footer';
import './Navbar.css'; // Import the navbar CSS
import './Footer.css'; // Import the footer CSS

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="d-flex flex-grow-1" style={{ marginTop: '56px', marginBottom: '56px' }}>
          <Sidebar />
          <div className="main-content p-4 w-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/trace" element={<Trace />} />
              <Route path="/config" element={<Config />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

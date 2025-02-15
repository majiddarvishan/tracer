import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Trace from './Trace';
import Config from './Config';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="d-flex flex-grow-1">
          <Sidebar />
          <div className="main-content container-fluid mt-4">
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

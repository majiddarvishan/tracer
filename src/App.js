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
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/trace" element={<Trace />} />
              <Route path="/config" element={<Config />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

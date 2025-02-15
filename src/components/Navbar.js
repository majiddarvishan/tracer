import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Settings } from 'lucide-react'; // Import icons from lucide-react
import '../assets/css/Navbar.css'; // Import the navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                <Home className="me-2" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trace">
                <Search className="me-2" /> Trace
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/config">
                <Settings className="me-2" /> Config
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

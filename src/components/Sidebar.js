import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Sidebar.css'; // Updated import path

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3 shadow-sm">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/home">
            <i className="bi bi-house-door-fill me-2"></i>Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/trace">
            <i className="bi bi-hash me-2"></i>Trace
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/config">
            <i className="bi bi-gear-fill me-2"></i>Config
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

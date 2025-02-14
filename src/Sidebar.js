import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3 shadow-sm">
      <h4 className="mb-4">Menu</h4>
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MessagesSquare, Settings } from 'lucide-react'; // Import icons from lucide-react
import '../assets/css/Sidebar.css'; // Import the sidebar CSS

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3 shadow-sm">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/home">
            <Home className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/trace">
            <MessagesSquare className="me-2" /> Trace
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="/config">
            <Settings className="me-2" /> Config
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/Sidebar.css'; // Import the sidebar CSS
import './assets/css/Home.css'; // Import the home CSS
import './assets/css/Trace.css'; // Import the trace CSS
import './assets/css/Navbar.css'; // Import the navbar CSS
import './assets/css/Footer.css'; // Import the footer CSS
// import './assets/css/custom.scss'; // Import custom styles
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

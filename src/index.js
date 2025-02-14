import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './custom.scss'; // Custom Bootstrap styles
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

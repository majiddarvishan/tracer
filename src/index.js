import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './custom.scss'; // Custom Bootstrap styles
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

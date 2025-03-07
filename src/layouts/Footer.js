import React from 'react';
import '../assets/css/Footer.css'; // Updated import path

const Footer = () => {
  return (
    <footer className="footer text-white">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} Shayan Pardaz. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

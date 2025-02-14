import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-primary text-white text-center py-3">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} MyApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
